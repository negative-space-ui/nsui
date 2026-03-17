import { Grid, GridProps } from '@negative-space/grid'
import { cn, useNSUI, type ValidationMode } from '@negative-space/system'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { FormContext, type FormContextValue, type FormErrors, type FormValues } from './FormContext'

function extractValue(e: unknown): unknown {
  if (typeof e === 'object' && e !== null && 'target' in e) {
    const t = (e as { target: HTMLInputElement }).target
    return t.type === 'checkbox' ? t.checked : t.value
  }
  return e
}

function injectFields<T extends FormValues>(
  node: React.ReactNode,
  ctx: FormContextValue<T>,
  disableSubmitOnError: boolean
): React.ReactNode {
  if (!React.isValidElement(node)) return node
  const el = node as React.ReactElement<Record<string, unknown>>
  const { name, children: elChildren } = el.props

  const injectedChildren = elChildren
    ? React.Children.map(elChildren as React.ReactNode, (child) =>
        injectFields(child, ctx, disableSubmitOnError)
      )
    : undefined

  if (disableSubmitOnError) {
    const elType = el.type
    const propType = el.props.type
    const isSubmitButton =
      (elType === 'button' && (propType === 'submit' || propType === undefined)) ||
      (elType === 'input' && propType === 'submit')
    if (isSubmitButton) {
      return React.cloneElement(el, {
        ...(injectedChildren ? { children: injectedChildren } : {}),
        disabled: el.props.disabled ?? !ctx.isValid
      })
    }
  }

  if (name && typeof name === 'string') {
    return (
      <ConnectedField
        key={el.key ?? name}
        __type={el.type as React.ElementType}
        {...el.props}
        name={name}
        {...(injectedChildren ? { children: injectedChildren } : {})}
      />
    )
  }

  return injectedChildren ? React.cloneElement(el, { children: injectedChildren }) : node
}

function ConnectedField({
  name,
  __type: Component,
  ...props
}: {
  name: string
  __type: React.ElementType
  [key: string]: unknown
}) {
  const ctx = useContext(FormContext)!
  const ctxRef = useRef(ctx)
  ctxRef.current = ctx

  const handlers = useRef({
    onChange: (e: unknown) => ctxRef.current.setValue(name, extractValue(e)),
    onBlur: () => ctxRef.current.handleBlur(name)
  })

  const { validationMode, touched, errors } = ctx
  const showError = validationMode === 'onChange' || validationMode === 'all' || touched[name]

  return (
    <Component
      {...props}
      name={name}
      value={ctx.values[name] ?? ''}
      error={showError ? errors[name] : undefined}
      onChange={handlers.current.onChange}
      onBlur={handlers.current.onBlur}
    />
  )
}

export interface FormProps<T extends FormValues = FormValues> extends Omit<
  GridProps<'form'>,
  'as' | 'children' | 'onSubmit' | 'onChange' | 'onError' | 'onReset' | 'onInvalid' | 'onInput'
> {
  validate?: (values: T) => FormErrors
  initialValues?: T
  validationMode?: ValidationMode
  validationDelay?: number
  onSubmit: (values: T) => void | Promise<void>
  onChange?: (values: T) => void
  onError?: (errors: FormErrors) => void
  onValidate?: (values: T) => void
  onReset?: () => void
  disableSubmitOnError?: boolean
  children: React.ReactNode | ((ctx: FormContextValue<T>) => React.ReactNode)
}

export function Form<T extends FormValues = FormValues>({
  validate,
  columns = 1,
  initialValues = {} as T,
  validationMode,
  validationDelay,
  onSubmit,
  onChange,
  onError,
  onValidate,
  onReset,
  disableSubmitOnError = true,
  children,
  className,
  id
}: FormProps<T>) {
  const { global, components } = useNSUI()

  const resolvedMode = (validationMode ?? components.form.validationMode) as ValidationMode
  const validationModeRef = useRef<ValidationMode | undefined>(resolvedMode)
  validationModeRef.current = resolvedMode

  const resolvedDelay = validationDelay ?? components.form.validationDelay

  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialRef = useRef(initialValues)
  const valuesRef = useRef(values)
  valuesRef.current = values

  const validateRef = useRef(validate)
  validateRef.current = validate
  const runValidate = useCallback((v: T) => validateRef.current?.(v) ?? {}, [])

  const shouldValidateOn = useCallback((trigger: 'onChange' | 'onBlur') => {
    const mode = validationModeRef.current
    return mode === trigger || mode === 'all'
  }, [])

  const validationDelayRef = useRef(resolvedDelay)
  validationDelayRef.current = resolvedDelay

  const pendingValidationRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const maybeValidate = useCallback(
    (vals: T, field?: string) => {
      const errs = runValidate(vals)
      setErrors((prev) => (field ? { ...prev, [field]: errs[field] } : errs))
    },
    [runValidate]
  )

  const maybeValidateDelayed = useCallback(
    (vals: T, field?: string) => {
      const delay = validationDelayRef.current
      if (!delay) {
        maybeValidate(vals, field)
        return
      }
      if (pendingValidationRef.current) clearTimeout(pendingValidationRef.current)
      pendingValidationRef.current = setTimeout(() => {
        pendingValidationRef.current = null
        maybeValidate(vals, field)
      }, delay)
    },
    [maybeValidate]
  )

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialRef.current)
  const isValid = Object.values(errors).every((e) => !e)

  const onValidateRef = useRef(onValidate)
  onValidateRef.current = onValidate
  const wasValidRef = useRef<boolean | null>(null)
  useEffect(() => {
    if (wasValidRef.current === null) {
      wasValidRef.current = isValid
      return
    }
    if (isValid && !wasValidRef.current) {
      onValidateRef.current?.(values)
    }
    wasValidRef.current = isValid
  }, [isValid, values])

  const disableSubmitOnErrorRef = useRef(disableSubmitOnError)
  disableSubmitOnErrorRef.current = disableSubmitOnError

  const ctx: FormContextValue<T> = {
    values,
    errors,
    touched,
    validationMode: resolvedMode,
    validationDelay: resolvedDelay,
    isSubmitting,
    isDirty,
    isValid,

    setValue: (name, value) => {
      const next = { ...valuesRef.current, [name]: value } as T
      valuesRef.current = next
      setValues(next)
      if (shouldValidateOn('onChange')) maybeValidateDelayed(next, name)
      onChange?.(next)
    },

    setValues: (partial) => {
      const next = { ...valuesRef.current, ...partial } as T
      valuesRef.current = next
      setValues(next)
      if (shouldValidateOn('onChange')) maybeValidateDelayed(next)
      onChange?.(next)
    },

    setError: (name, message) => setErrors((prev) => ({ ...prev, [name]: message })),

    clearError: (name) =>
      setErrors((prev) => {
        const n = { ...prev }
        delete n[name]
        return n
      }),

    clearErrors: () => setErrors({}),

    markTouched: (name) => setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true })),

    handleBlur: (name) => {
      setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }))
      if (shouldValidateOn('onBlur')) maybeValidateDelayed(valuesRef.current, name)
    },

    reset: (newValues) => {
      if (pendingValidationRef.current) {
        clearTimeout(pendingValidationRef.current)
        pendingValidationRef.current = null
      }
      const v = newValues ?? initialRef.current
      initialRef.current = v
      valuesRef.current = v
      setValues(v)
      setErrors({})
      setTouched({})
      setIsSubmitting(false)
      onReset?.()
    },

    submit: async () => {
      if (pendingValidationRef.current) {
        clearTimeout(pendingValidationRef.current)
        pendingValidationRef.current = null
      }
      const cur = valuesRef.current
      setTouched(Object.keys(cur).reduce((a, k) => ({ ...a, [k]: true }), {}))
      const errs = runValidate(cur)
      if (Object.values(errs).some(Boolean)) {
        setErrors(errs)
        onError?.(errs)
        return
      }
      setErrors({})
      setIsSubmitting(true)
      try {
        await onSubmit(cur)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <FormContext.Provider value={ctx as FormContextValue}>
      <Grid
        as="form"
        id={id}
        columns={columns}
        className={cn(`${global.prefixCls}-form`, className)}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          ctx.submit()
        }}
        noValidate
      >
        {typeof children === 'function'
          ? children(ctx)
          : React.Children.map(children, (child) => injectFields(child, ctx, disableSubmitOnError))}
      </Grid>
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'
