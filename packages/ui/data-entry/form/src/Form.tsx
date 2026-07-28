import { Grid, type GridProps } from '@negative-space/grid'
import { cn, useNSUI, type ValidationMode } from '@negative-space/system'
import React from 'react'

import type { InferAdapter, SchemaAdapter } from './adapters/types'
import { FormContext, type FormContextValue, type FormErrors, type FormValues } from './FormContext'
import { injectFields } from './injectFields'
import { useFormState } from './useFormState'

type GridPassthrough = Omit<
  GridProps<'form'>,
  'as' | 'children' | 'onSubmit' | 'onChange' | 'onError' | 'onReset' | 'onInvalid' | 'onInput'
>

interface FormSharedProps<T extends FormValues> extends GridPassthrough {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormPropsWithSchema<A extends SchemaAdapter<any>> extends FormSharedProps<
  InferAdapter<A>
> {
  schema: A
}

export interface FormPropsManual<T extends FormValues> extends FormSharedProps<T> {
  schema?: undefined
  initialValues: T
  validate?: (values: T) => FormErrors
  parse?: (values: T) => T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormProps<A extends SchemaAdapter<any> = SchemaAdapter<any>> =
  | FormPropsWithSchema<A>
  | FormPropsManual<InferAdapter<A>>

interface FormImplProps {
  schema?: SchemaAdapter<FormValues>
  initialValues?: FormValues
  validate?: (values: FormValues) => FormErrors
  parse?: (values: FormValues) => FormValues
  columns?: GridPassthrough['columns']
  validationMode?: ValidationMode
  validationDelay?: number
  onSubmit: (values: FormValues) => void | Promise<void>
  onChange?: (values: FormValues) => void
  onError?: (errors: FormErrors) => void
  onValidate?: (values: FormValues) => void
  onReset?: () => void
  disableSubmitOnError?: boolean
  children: React.ReactNode | ((ctx: FormContextValue<FormValues>) => React.ReactNode)
  className?: string
  id?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Form<A extends SchemaAdapter<any>>(
  props: FormPropsWithSchema<A>
): React.ReactElement
export function Form<T extends FormValues>(props: FormPropsManual<T>): React.ReactElement
export function Form(props: unknown): React.ReactElement {
  const {
    schema,
    initialValues,
    validate,
    parse,
    columns = 1,
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
    id,
    ...gridProps
  } = props as FormImplProps & Record<string, unknown>
  const { global, components } = useNSUI()

  const resolvedInitialValues = schema ? schema.initialValues : (initialValues ?? {})
  const resolvedValidate = schema ? schema.validate : validate
  const resolvedParse = schema ? schema.parse : parse

  const resolvedMode = (validationMode ?? components.form.validationMode) as ValidationMode
  const resolvedDelay = validationDelay ?? components.form.validationDelay
  const resolvedDisable = disableSubmitOnError ?? components.form.disableSubmitOnError!

  const ctx = useFormState<FormValues>({
    initialValues: resolvedInitialValues,
    validate: resolvedValidate,
    validationMode: resolvedMode,
    validationDelay: resolvedDelay,
    onSubmit: async (values) => {
      const parsed = resolvedParse ? resolvedParse(values) : values
      await onSubmit(parsed)
    },
    onChange,
    onError,
    onValidate,
    onReset
  })

  return (
    <FormContext.Provider value={ctx}>
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
        {...(gridProps as GridPassthrough)}
      >
        {typeof children === 'function'
          ? children(ctx)
          : React.Children.map(children, (child) => injectFields(child, ctx, resolvedDisable))}
      </Grid>
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'
