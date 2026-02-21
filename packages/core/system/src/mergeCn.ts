import { cn } from '.'

export function mergeCn<T extends Record<string, string | undefined>>(base?: T, override?: T): T {
  const result: Record<string, string | undefined> = {}

  for (const key in { ...base, ...override }) {
    result[key] = cn(base?.[key], override?.[key])
  }

  return result as T
}
