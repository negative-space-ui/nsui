import type { FormErrors, FormValues } from '../FormContext'

export interface SchemaAdapter<T extends FormValues> {
  initialValues: T
  validate: (values: T) => FormErrors
  parse: (values: T) => T
}

export type InferAdapter<A> = A extends SchemaAdapter<infer T> ? T : never
