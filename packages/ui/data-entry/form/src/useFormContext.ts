import { useContext } from 'react'

import { FormContext, type FormContextValue, type FormValues } from './FormContext'

export function useForm<T extends FormValues = FormValues>() {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error('useForm must be used inside <Form>')
  return ctx as FormContextValue<T>
}
