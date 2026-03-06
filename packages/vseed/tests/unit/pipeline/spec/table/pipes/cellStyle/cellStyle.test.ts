import { tableBodyCell } from 'src/pipeline/spec/table/pipes/cellStyle/table'
import { pivotTableBodyCell } from 'src/pipeline/spec/table/pipes/cellStyle/pivot'
import type { SpecPipelineContext, AdvancedVSeed } from 'src/types'
import { vi } from 'vitest'

// Mock selector
vi.mock('src/dataSelector/selector', () => ({
  selector: vi.fn().mockReturnValue(true),
  isFieldSelector: vi.fn().mockReturnValue(false),
}))

// Mock common
vi.mock('src/pipeline/spec/table/pipes/cellStyle/common', () => ({
  pickBodyCellStyle: vi.fn().mockReturnValue({ bgColor: 'red' }),
  getCellOriginalDataByDatum: vi.fn().mockReturnValue(null)
}))

describe('cellStyle pipes', () => {
  const mockContext = {
    advancedVSeed: {
      cellStyle: {
        bodyCellStyle: {
          selector: { field: 'sales' },
          bgColor: 'red'
        }
      }
    } as unknown as AdvancedVSeed
  } as SpecPipelineContext

  describe('tableBodyCell', () => {
    it('should return original spec if bodyCellStyle is missing', () => {
      const spec = { columns: [] }
      const context = {
        advancedVSeed: {
          cellStyle: {}
        } as unknown as AdvancedVSeed
      } as SpecPipelineContext
      expect(tableBodyCell(spec as any, context)).toEqual(spec)
    })

    it('should apply style to matching columns', () => {
      const spec = {
        columns: [
          { field: 'sales' },
          { field: 'category' }
        ]
      }
      
      tableBodyCell(spec as any, mockContext)
      
      // Check if style function is attached to 'sales' column
      const salesCol = spec.columns[0]
      expect(salesCol.style).toBeDefined()
      expect(typeof salesCol.style).toBe('function')
      
      // Execute style function
      const styleFn = salesCol.style as (args: any) => any  
      const styleResult = styleFn({ dataValue: 100, col: 0, row: 0 })
      expect(styleResult).toEqual({ bgColor: 'red' })
      
      // Check 'category' column (should not match if selector checks field)
      // Note: My mock selector returns true always, BUT the filter inside tableBodyCell checks field match first.
      // let's verify logic in table.ts:
      // const matchedStyles = bodyCellStyleList.filter((style) => { ... isNullish(selector.field) || selector.field === field ... })
      
      // So 'category' column should NOT have style if selector has field 'sales'
      const categoryCol = spec.columns[1]
      // It might be undefined or false depending on implementation. 
      // Implementation: col.style = ... returns false if no matchedStyles.
      // Wait, if !matchedStyles.length return false.
      // But it sets col.style ONLY if matchedStyles.length > 0.
      expect(categoryCol.style).toBeUndefined()
    })
  })

  describe('pivotTableBodyCell', () => {
    it('should return original spec if bodyCellStyle is missing', () => {
      const spec = { indicators: [] }
      const context = {
        advancedVSeed: {
          cellStyle: {}
        } as unknown as AdvancedVSeed
      } as SpecPipelineContext
      expect(pivotTableBodyCell(spec as any, context)).toEqual(spec)
    })

    it('should apply style to indicators', () => {
      const spec = {
        indicators: [
          { indicatorKey: 'sales', caption: 'Sales' },
          'profit' // string indicator
        ]
      }
      
      const result = pivotTableBodyCell(spec as any, mockContext) as any
      
      expect(result.indicators).toHaveLength(2)
      expect(result.indicators[0].style).toBeDefined()
      expect(result.indicators[1].style).toBeDefined() // String indicator converted to object and style applied
      
      // Execute style function
      const styleFn = result.indicators[0].style as (args: any) => any
      const datum = {
        dataValue: 100,
        cellHeaderPaths: {
          colHeaderPaths: [{ dimensionKey: 'region', value: 'North' }],
          rowHeaderPaths: [{ dimensionKey: 'category', value: 'Office' }]
        },
        col: 0,
        row: 0
      }
      const styleResult = styleFn(datum)
      expect(styleResult).toEqual({ bgColor: 'red' })
    })
  })
})
