import { Grid, GridProps } from '@negative-space/grid'
import { cn, useNSUI } from '@negative-space/system'
import React, { useCallback, useRef, useState } from 'react'

import {
  FormContext,
  type FormContextValue,
  type FormErrors,
  type FormValues,
  type TouchedFields,
  type ValidationMode
} from './FormContext'

function isDeepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
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
  const [values, setValuesState] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const initialValuesRef = useRef(initialValues)

  const isDirty = !isDeepEqual(values, initialValuesRef.current)
  const isValid = Object.keys(errors).length === 0

  const runValidate = useCallback((vals: T): FormErrors => validate?.(vals) ?? {}, [validate])

  const setValue = useCallback(
    (name: string, value: unknown) => {
      setValuesState((prev) => {
        const next = { ...prev, [name]: value }

        if (validationMode === 'onChange' || validationMode === 'all') {
          setErrors(runValidate(next))
        }

        onChange?.(next)
        return next
      })
    },
    [runValidate, validationMode, onChange]
  )

  const setValues = useCallback(
    (partial: Partial<T>) => {
      setValuesState((prev) => {
        const next = { ...prev, ...partial }

        if (validationMode === 'onChange' || validationMode === 'all') {
          setErrors(runValidate(next))
        }

        onChange?.(next)
        return next
      })
    },
    [runValidate, validationMode, onChange]
  )

  const setError = useCallback((name: string, message: string) => {
    setErrors((prev) => ({ ...prev, [name]: message }))
  }, [])

  const clearError = useCallback((name: string) => {
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  const clearErrors = useCallback(() => setErrors({}), [])

  const markTouched = useCallback(
    (name: string) => {
      setTouched((prev) => {
        if (prev[name]) return prev
        const next = { ...prev, [name]: true }

        if (validationMode === 'onBlur' || validationMode === 'all') {
          setErrors(runValidate(values))
        }

        return next
      })
    },
    [runValidate, validationMode, values]
  )

  const reset = useCallback(
    (newValues?: T) => {
      const resetTo = newValues ?? initialValuesRef.current
      initialValuesRef.current = resetTo
      setValuesState(resetTo)
      setErrors({})
      setTouched({})
      setIsSubmitting(false)
      onReset?.()
    },
    [onReset]
  )

  const handleSubmit = useCallback(async () => {
    const allTouched = Object.keys(values).reduce<TouchedFields>(
      (acc, k) => ({ ...acc, [k]: true }),
      {}
    )
    setTouched(allTouched)

    const fieldErrors = runValidate(values)

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      onError?.(fieldErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      await onSubmit(values)
    } finally {
      setIsSubmitting(false)
    }
  }, [values, runValidate, onSubmit, onError])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit()
  }

  const ctx: FormContextValue<T> = {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    isValid,
    setValue,
    setValues,
    setError,
    clearError,
    clearErrors,
    markTouched,
    reset,
    submit: handleSubmit
  }

  return (
    <FormContext.Provider value={ctx as FormContextValue}>
      <Grid
        as="form"
        id={id}
        columns={columns}
        className={cn(`${global.prefixCls}-form`, className)}
        onSubmit={handleFormSubmit}
        noValidate
      >
        {typeof children === 'function' ? children(ctx) : children}
      </Grid>
    </FormContext.Provider>
  )
}
