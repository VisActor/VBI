import { breakpointKeys } from '../../core/layout'
import type { Breakpoint } from '../../types'

export function getBreakpointByWidth(width: number, breakpoints: Record<Breakpoint, number>): Breakpoint {
  for (const breakpoint of breakpointKeys) {
    if (width >= breakpoints[breakpoint]) return breakpoint
  }

  return 'xs'
}

export function getElementBreakpoint(element: Element, breakpoints: Record<Breakpoint, number>): Breakpoint {
  return getBreakpointByWidth(element.getBoundingClientRect().width, breakpoints)
}
