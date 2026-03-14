import { Grid, GridProps } from '@negative-space/grid'
import { cn, useNSUI } from '@negative-space/system'
import React, { useContext, useRef, useState } from 'react'

import {
  FormContext,
  type FormContextValue,
  type FormErrors,
  type FormValues,
  type ValidationMode
} from './FormContext'

function extractValue(e: unknown): unknown {
  if (typeof e === 'object' && e !== null && 'target' in e) {
    const t = (e as { target: HTMLInputElement }).target
    return t.type === 'checkbox' ? t.checked : t.value
  }
  return e
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

  const showError =
    ctx.validationMode === 'onChange' || ctx.validationMode === 'all' || ctx.touched[name]

  return (
    <Component
      {...props}
      name={name}
      value={ctx.values[name] ?? ''}
      error={showError ? ctx.errors[name] : undefined}
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
  onSubmit: (values: T) => void | Promise<void>
  onChange?: (values: T) => void
  onError?: (errors: FormErrors) => void
  onReset?: () => void
  children: React.ReactNode | ((ctx: FormContextValue<T>) => React.ReactNode)
}

export function Form<T extends FormValues = FormValues>({
  validate,
  columns = 1,
  initialValues = {} as T,
  validationMode = 'onSubmit',
  onSubmit,
  onChange,
  onError,
  onReset,
  children,
  className,
  id
}: FormProps<T>) {
  const { global } = useNSUI()

  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialRef = useRef(initialValues)
  const valuesRef = useRef(values)
  valuesRef.current = values

  const runValidate = (v: T) => validate?.(v) ?? {}

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialRef.current)
  const isValid = Object.values(errors).every((e) => !e)

  const ctx: FormContextValue<T> = {
    values,
    errors,
    touched,
    validationMode,
    isSubmitting,
    isDirty,
    isValid,

    setValue: (name, value) => {
      const next = { ...valuesRef.current, [name]: value } as T
      valuesRef.current = next
      setValues(next)
      if (validationMode === 'onChange' || validationMode === 'all') {
        const errs = runValidate(next)
        setErrors((prev) => ({ ...prev, [name]: errs[name] }))
      }
      onChange?.(next)
    },

    setValues: (partial) => {
      const next = { ...valuesRef.current, ...partial } as T
      valuesRef.current = next
      setValues(next)
      if (validationMode === 'onChange' || validationMode === 'all') {
        setErrors(runValidate(next))
      }
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
      if (validationMode === 'onBlur' || validationMode === 'all') {
        const errs = runValidate(valuesRef.current)
        setErrors((prev) => ({ ...prev, [name]: errs[name] }))
      }
    },

    reset: (newValues) => {
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

  function injectFields(node: React.ReactNode): React.ReactNode {
    if (!React.isValidElement(node)) return node
    const el = node as React.ReactElement<Record<string, unknown>>
    const { name, children: elChildren } = el.props

    const injectedChildren = elChildren
      ? React.Children.map(elChildren as React.ReactNode, injectFields)
      : undefined

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
          : React.Children.map(children, injectFields)}
      </Grid>
    </FormContext.Provider>
  )
}
