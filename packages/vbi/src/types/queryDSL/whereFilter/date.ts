import { z } from 'zod'

export type VBIWhereDateInput = string | Date
export type VBIWhereDateUnit = 'year' | 'quarter' | 'month' | 'week' | 'day'
export type VBIWhereDateBounds = '[)' | '[]'

export type VBIWhereDatePeriod =
  | { unit: 'year'; year: number }
  | { unit: 'quarter'; year: number; quarter: 1 | 2 | 3 | 4 }
  | { unit: 'month'; year: number; month: number }
  | { unit: 'week'; year: number; week: number }
  | { unit: 'day'; date: VBIWhereDateInput }

export type VBIWhereDatePredicate =
  | { type: 'range'; start: VBIWhereDateInput; end: VBIWhereDateInput; bounds?: VBIWhereDateBounds }
  | { type: 'relative'; mode: 'last' | 'next'; amount: number; unit: VBIWhereDateUnit; complete?: boolean }
  | { type: 'current'; unit: VBIWhereDateUnit; offset?: number }
  | ({ type: 'period' } & VBIWhereDatePeriod)

// --- Zod schemas ---

const zVBIWhereDateInput = z.union([z.string(), z.date()])

const zVBIWhereDatePeriod = z.discriminatedUnion('unit', [
  z.object({ unit: z.literal('year'), year: z.number().int() }),
  z.object({
    unit: z.literal('quarter'),
    year: z.number().int(),
    quarter: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  }),
  z.object({
    unit: z.literal('month'),
    year: z.number().int(),
    month: z.number().int().min(1).max(12),
  }),
  z.object({
    unit: z.literal('week'),
    year: z.number().int(),
    week: z.number().int().min(1).max(53),
  }),
  z.object({ unit: z.literal('day'), date: zVBIWhereDateInput }),
])

export const zVBIWhereDatePredicate = z.union([
  z.object({
    type: z.literal('range'),
    start: zVBIWhereDateInput,
    end: zVBIWhereDateInput,
    bounds: z.enum(['[)', '[]']).optional(),
  }),
  z.object({
    type: z.literal('relative'),
    mode: z.enum(['last', 'next']),
    amount: z.number().int().positive(),
    unit: z.enum(['year', 'quarter', 'month', 'week', 'day']),
    complete: z.boolean().optional(),
  }),
  z.object({
    type: z.literal('current'),
    unit: z.enum(['year', 'quarter', 'month', 'week', 'day']),
    offset: z.number().int().optional(),
  }),
  z.object({ type: z.literal('period') }).and(zVBIWhereDatePeriod),
])
