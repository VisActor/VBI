import { parseSQLExpression } from '../../../src/sql/parser'
import { createNumericAstCases } from '../../fixtures/numeric-ast-cases'

it('reconstructs 1000 independently generated numeric ASTs including bindings and quoted names', () => {
  for (const test of createNumericAstCases()) {
    expect(parseSQLExpression(test.expr, test.parameters), test.name).toEqual(test.ast)
  }
})
