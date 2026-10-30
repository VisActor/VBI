type Scalar = unknown

export type BinaryOperator = '=' | '!=' | '<>' | '>' | '>=' | '<' | '<='
export type LikeOperator = 'like' | 'ilike' | 'not like' | 'not ilike'

export type Expression =
  | { type: 'field'; name: string }
  | { type: 'literal'; value: Scalar }
  | { type: 'star' }
  | { type: 'call'; name: string; arguments: Expression[]; distinct: boolean }
  | { type: 'concat'; parts: Expression[] }
  | { type: 'case'; when: Predicate; value: Expression }
  | { type: 'binary'; operator: '+' | '-' | '*' | '/'; left: Expression; right: Expression }
  | { type: 'unary'; operator: '+' | '-'; value: Expression }

export type Predicate =
  | { type: 'logic'; operator: 'and' | 'or'; left: Predicate; right: Predicate }
  | { type: 'not'; value: Predicate }
  | { type: 'comparison'; operator: 'is null' | 'is not null'; left: Expression; right?: never }
  | {
      type: 'comparison'
      operator: 'between' | 'not between'
      left: Expression
      right?: never
      values: [Expression, Expression]
    }
  | { type: 'comparison'; operator: 'in' | 'not in'; left: Expression; right?: never; values: Expression[] }
  | { type: 'comparison'; operator: BinaryOperator | LikeOperator; left: Expression; right: Expression }
  | { type: 'truthy'; value: Expression }

export type SelectItem = { expression: Expression; alias?: string }
type OrderItem = { expression: Expression; direction: 'asc' | 'desc'; nulls: 'first' | 'last' }

export type SelectQuery = {
  table?: string
  subquery?: SelectQuery
  select: SelectItem[]
  where?: Predicate
  groupBy: Expression[]
  having?: Predicate
  orderBy: OrderItem[]
  limit?: number
}
