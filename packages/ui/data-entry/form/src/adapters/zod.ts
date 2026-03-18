import { type ZodSchema, type ZodTypeAny } from 'zod'

import type { FormErrors, FormValues } from '../FormContext'

function extractDefaults(schema: ZodSchema): Record<string, unknown> {
  const s = schema as unknown as { _def: { type: string; shape?: Record<string, ZodTypeAny> } }
  const def = s._def

  if (def.type === 'object' && def.shape && typeof def.shape === 'object') {
    const shape = def.shape
    const result: Record<string, unknown> = {}
    for (const key in shape) {
      const fieldDef = (shape[key] as unknown as { _def: { type: string; defaultValue?: unknown } })
        ._def
      if (fieldDef.type === 'default') {
        result[key] =
          typeof fieldDef.defaultValue === 'function'
            ? (fieldDef.defaultValue as () => unknown)()
            : fieldDef.defaultValue
      } else {
        result[key] = ''
      }
    }
    return result
  }

  return {}
}

export function zodAdaptor<T extends FormValues>(schema: ZodSchema<T>) {
  return {
    initialValues: extractDefaults(schema) as T,

    validate: (values: T): FormErrors => {
      const result = schema.safeParse(values)

      if (result.success) return {}

      const errors: FormErrors = {}

      for (const issue of result.error.issues) {
        const key = issue.path.join('.')

        if (!errors[key]) {
          errors[key] = issue.message
        }
      }

      return errors
    },

    parse: (values: T): T => {
      return schema.parse(values)
    }
  }
}
