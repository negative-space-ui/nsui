import { z, type ZodSchema } from 'zod'

import type { FormErrors, FormValues } from '../../FormContext'
import type { SchemaAdapter } from '../types'

interface ZodDefLike {
  defaultValue?: unknown | (() => unknown)
  innerType?: unknown
}

interface ZodSchemaLike {
  _def?: ZodDefLike
  shape?: Record<string, unknown>
}

export function zodAdapter<T extends FormValues>(schema: ZodSchema<T>): SchemaAdapter<T> {
  const initialValues = isZodObjectSchema(schema) ? (extractDefaults(schema) as T) : ({} as T)

  return {
    initialValues,

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

    parse: (values: T): T => schema.parse(values)
  }
}

function asSchemaLike(value: unknown): ZodSchemaLike {
  return value as ZodSchemaLike
}

function isZodObjectSchema(value: unknown): value is InstanceType<typeof z.ZodObject> {
  return value instanceof z.ZodObject
}

function getShape(schema: InstanceType<typeof z.ZodObject>): Record<string, unknown> {
  return asSchemaLike(schema).shape ?? {}
}

function getDefaultFor(fieldSchema: unknown): unknown {
  let current = fieldSchema
  const def = asSchemaLike(current)._def

  if (def && 'defaultValue' in def) {
    const { defaultValue } = def
    return typeof defaultValue === 'function' ? (defaultValue as () => unknown)() : defaultValue
  }

  if (def?.innerType) {
    current = def.innerType
  }

  if (isZodObjectSchema(current)) {
    return extractDefaults(current)
  }
  if (current instanceof z.ZodArray) return []
  if (current instanceof z.ZodBoolean) return false
  if (current instanceof z.ZodNumber) return undefined

  return ''
}

function extractDefaults(schema: InstanceType<typeof z.ZodObject>): Record<string, unknown> {
  const shape = getShape(schema)
  const result: Record<string, unknown> = {}

  for (const key in shape) {
    result[key] = getDefaultFor(shape[key])
  }

  return result
}
