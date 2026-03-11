import { type ZodSchema } from 'zod'

import type { FormErrors, FormValues } from '../FormContext'

export function zodAdaptor<T extends FormValues>(schema: ZodSchema<T>) {
  const parsed = schema.safeParse({})

  return {
    initialValues: (parsed.success ? parsed.data : {}) as T,
    validate: (values: T): FormErrors => {
      const result = schema.safeParse(values)
      if (result.success) return {}

      const errors: FormErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path.join('.')
        if (!errors[key]) errors[key] = issue.message
      }
      return errors
    },
  }
}
