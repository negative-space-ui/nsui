import clsx, { type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

type ClassNamesValue =
  | string
  | undefined
  | {
      [key: string]: ClassNamesValue
    }

function isClassNamesObject(
  value: ClassNamesValue | undefined
): value is { [key: string]: ClassNamesValue } {
  return typeof value === 'object' && value !== null
}

export function mergeCn<T extends { [key: string]: ClassNamesValue }>(base?: T, override?: T): T {
  const result: { [key: string]: ClassNamesValue } = {}

  for (const key of new Set([...Object.keys(base ?? {}), ...Object.keys(override ?? {})])) {
    const baseValue = base?.[key]
    const overrideValue = override?.[key]

    if (isClassNamesObject(baseValue) || isClassNamesObject(overrideValue)) {
      result[key] = mergeCn(
        isClassNamesObject(baseValue) ? baseValue : undefined,
        isClassNamesObject(overrideValue) ? overrideValue : undefined
      )
    } else {
      result[key] = cn(baseValue, overrideValue)
    }
  }

  return result as T
}
