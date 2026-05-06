export function clone<T>(value: T): T {
  if (typeof structuredClone === 'function') return structuredClone(value)
  return JSON.parse(JSON.stringify(value)) as T
}

export function stripUndefined<T extends object>(input: T): Partial<T> {
  const result: Partial<T> = {}

  for (const [key, value] of Object.entries(input) as [keyof T, T[keyof T]][]) {
    if (value !== undefined) result[key] = value
  }

  return result
}
