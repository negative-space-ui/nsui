import { createContext } from 'react'

export type FormValues = Record<string, unknown>
export type FormErrors = Record<string, string | undefined>
export type TouchedFields = Record<string, boolean>

export type ValidationMode = 'onSubmit' | 'onChange' | 'onBlur' | 'all'

export interface FormContextValue<T extends FormValues = FormValues> {
  values: T
  errors: FormErrors
  touched: TouchedFields
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  setValue: (name: string, value: unknown) => void
  setValues: (values: Partial<T>) => void
  setError: (name: string, message: string) => void
  clearError: (name: string) => void
  clearErrors: () => void
  markTouched: (name: string) => void
  reset: (values?: T) => void
  submit: () => void
}

export const FormContext = createContext<FormContextValue | null>(null)
