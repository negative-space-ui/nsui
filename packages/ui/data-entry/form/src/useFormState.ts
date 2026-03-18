import type { ValidationMode } from '@negative-space/system'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { FormContextValue, FormErrors, FormValues } from './FormContext'

export interface UseFormStateOptions<T extends FormValues> {
  initialValues: T
  validate?: (values: T) => FormErrors
  validationMode: ValidationMode
  validationDelay: number | undefined
  onSubmit: (values: T) => void | Promise<void>
  onChange?: (values: T) => void
  onError?: (errors: FormErrors) => void
  onValidate?: (values: T) => void
  onReset?: () => void
}

export function useFormState<T extends FormValues>({
  initialValues,
  validate,
  validationMode,
  validationDelay,
  onSubmit,
  onChange,
  onError,
  onValidate,
  onReset
}: UseFormStateOptions<T>): FormContextValue<T> {
  const validateRef = useRef(validate)
  validateRef.current = validate
  const runValidate = useCallback((v: T) => validateRef.current?.(v) ?? {}, [])

  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialRef = useRef(initialValues)
  const valuesRef = useRef(values)
  valuesRef.current = values

  const validationModeRef = useRef(validationMode)
  validationModeRef.current = validationMode

  const validationDelayRef = useRef(validationDelay)
  validationDelayRef.current = validationDelay

  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const shouldValidateOn = useCallback((trigger: 'onChange' | 'onBlur') => {
    const mode = validationModeRef.current
    return mode === trigger || mode === 'all'
  }, [])

  const applyValidation = useCallback(
    (vals: T, field?: string) => {
      const errs = runValidate(vals)
      setErrors((prev) => (field ? { ...prev, [field]: errs[field] } : errs))
    },
    [runValidate]
  )

  const scheduleValidation = useCallback(
    (vals: T, field?: string) => {
      const delay = validationDelayRef.current
      if (!delay) {
        applyValidation(vals, field)
        return
      }
      if (pendingRef.current) clearTimeout(pendingRef.current)
      pendingRef.current = setTimeout(() => {
        pendingRef.current = null
        applyValidation(vals, field)
      }, delay)
    },
    [applyValidation]
  )

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialRef.current)
  const isValid = Object.values(runValidate(values)).every((e) => !e)
  const onValidateRef = useRef(onValidate)
  onValidateRef.current = onValidate
  const wasValidRef = useRef<boolean | null>(null)
  useEffect(() => {
    if (wasValidRef.current === null) {
      wasValidRef.current = isValid
      return
    }
    if (isValid && !wasValidRef.current) onValidateRef.current?.(values)
    wasValidRef.current = isValid
  }, [isValid, values])

  return {
    values,
    errors,
    touched,
    validationMode,
    validationDelay,
    isSubmitting,
    isDirty,
    isValid,

    setValue: (name, value) => {
      const next = { ...valuesRef.current, [name]: value } as T
      valuesRef.current = next
      setValues(next)
      if (shouldValidateOn('onChange')) scheduleValidation(next, name)
      onChange?.(next)
    },

    setValues: (partial) => {
      const next = { ...valuesRef.current, ...partial } as T
      valuesRef.current = next
      setValues(next)
      if (shouldValidateOn('onChange')) scheduleValidation(next)
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
      if (shouldValidateOn('onBlur')) scheduleValidation(valuesRef.current, name)
    },

    reset: (newValues) => {
      if (pendingRef.current) {
        clearTimeout(pendingRef.current)
        pendingRef.current = null
      }
      const v = newValues ?? initialRef.current
      initialRef.current = v
      valuesRef.current = v
      setValues(v)
      setErrors(runValidate(v))
      setTouched({})
      setIsSubmitting(false)
      onReset?.()
    },

    submit: async () => {
      if (pendingRef.current) {
        clearTimeout(pendingRef.current)
        pendingRef.current = null
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
}
