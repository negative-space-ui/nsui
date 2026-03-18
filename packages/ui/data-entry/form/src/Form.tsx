import { Grid, GridProps } from '@negative-space/grid'
import { cn, useNSUI, type ValidationMode } from '@negative-space/system'
import React, { useContext, useRef } from 'react'

import { FormContext, type FormContextValue, type FormErrors, type FormValues } from './FormContext'
import { useFormState } from './useFormState'

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

  if (disableSubmitOnError && el.props.type === 'submit') {
    return React.cloneElement(el, {
      ...(injectedChildren ? { children: injectedChildren } : {}),
      disabled: Boolean(el.props.disabled) || !ctx.isValid
    })
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
  disableSubmitOnError,
  children,
  className,
  id
}: FormProps<T>) {
  const { global, components } = useNSUI()

  const resolvedMode = (validationMode ?? components.form.validationMode) as ValidationMode
  const resolvedDelay = validationDelay ?? components.form.validationDelay
  const resolvedDisable = disableSubmitOnError ?? components.form.disableSubmitOnError!

  const ctx = useFormState<T>({
    initialValues,
    validate,
    validationMode: resolvedMode,
    validationDelay: resolvedDelay,
    onSubmit,
    onChange,
    onError,
    onValidate,
    onReset
  })

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
          : React.Children.map(children, (child) => injectFields(child, ctx, resolvedDisable))}
      </Grid>
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'
