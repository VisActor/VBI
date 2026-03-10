# WhereFilters Nested Group Support - Design Specification

**Date:** 2026-03-10
**Status:** Draft
**Author:** VBI Team

## Overview

Refactor the WhereFilters builder to support nested logical groups (AND/OR) with a composition-based architecture. This enables complex filtering expressions while maintaining a clean, type-safe API.

## Goals

1. Support nested AND/OR groups with arbitrary depth
2. Maintain backward-compatible API surface where possible
3. Use UUID-based identification for precise operations
4. Provide field-based convenience methods with recursive search
5. Clear type separation between root and group builders

## Non-Goals

- Backward compatibility with old flat array DSL (breaking change accepted)
- Support for other logical operators beyond AND/OR
- Query optimization or performance tuning (future work)

## Architecture

### Component Overview

```
┌─────────────────────────────────────────────────────────┐
│ VBIBuilder                                              │
│   └─ whereFilters: WhereFiltersBuilder (root)          │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ WhereFiltersBuilder (Root Entry Point)                  │
│ - Initializes dsl.whereFilters structure                │
│ - Public API: add(), addGroup(), find(), remove()       │
│ - Delegates to WhereFilterCore                          │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ WhereFilterCore (Tree Operations Engine)                │
│ - Recursive add/find/remove operations                  │
│ - Works directly with Yjs structures                    │
│ - Stateless, reusable logic                             │
└─────────────────────────────────────────────────────────┘
         ↓                              ↓
┌──────────────────────┐    ┌──────────────────────────┐
│ WhereFilterNodeBuilder│    │ WhereFilterGroupBuilder  │
│ (Leaf Condition)      │    │ (Nested Group)           │
│ - setField()          │    │ - add()                  │
│ - setOperator()       │    │ - addGroup()             │
│ - setValue()          │    │ - setLogic()             │
└──────────────────────┘    └──────────────────────────┘
```

### Class Responsibilities

#### WhereFilterNodeBuilder

- Represents a single filter condition (leaf node)
- Wraps Yjs Map: `{ id: string, field: string, op?: string, value?: any }`
- Fluent API for setting field, operator, value
- Read-only `getId()` and `getField()`

#### WhereFilterCore

- Core tree manipulation engine
- Handles recursive operations: addCondition, addGroup, findByField, findById, removeById
- Returns builder instances (NodeBuilder or GroupBuilder)
- No public API exposure (internal use only)

#### WhereFiltersBuilder

- Root-level builder, entry point from `VBIBuilder.whereFilters`
- Initializes `dsl.whereFilters` with root group structure
- Delegates all operations to `WhereFilterCore`
- Methods: `add()`, `addGroup()`, `find()`, `findById()`, `remove()`, `removeById()`, `setLogic()`, `clear()`, `findAll()`, `toJson()`, `observe()`

#### WhereFilterGroupBuilder

- Nested group builder, created by `addGroup()` callback
- Separate type from `WhereFiltersBuilder` for clarity
- Delegates operations to `WhereFilterCore`
- Methods: `add()`, `addGroup()`, `find()`, `findById()`, `remove()`, `removeById()`, `setLogic()`, `getId()`

## DSL Structure

### New Nested Format

```typescript
{
  "whereFilters": {
    "id": "uuid-root",
    "logic": "and",
    "conditions": [
      {
        "id": "uuid-1",
        "field": "age",
        "op": ">",
        "value": 18
      },
      {
        "id": "uuid-2",
        "logic": "or",
        "conditions": [
          {
            "id": "uuid-3",
            "field": "role",
            "op": "=",
            "value": "admin"
          },
          {
            "id": "uuid-4",
            "field": "role",
            "op": "=",
            "value": "super"
          }
        ]
      }
    ]
  }
}
```

### Type Definitions

```typescript
// Leaf condition
type WhereFilterLeaf = {
  id: string // UUID v4
  field: string
  op?: string
  value?: any
}

// Nested group
type WhereFilterGroup = {
  id: string // UUID v4
  logic: 'and' | 'or'
  conditions: WhereFilterCondition[]
}

// Union type
type WhereFilterCondition = WhereFilterLeaf | WhereFilterGroup

// Root structure
type WhereFiltersRoot = {
  id: string // UUID v4
  logic: 'and' | 'or'
  conditions: WhereFilterCondition[]
}
```

## API Design

### Basic Operations

```typescript
// Add simple conditions
builder.where
  .add('age', (node) => node.setOperator('>').setValue(18))
  .add('name', (node) => node.setOperator('=').setValue('test'))

// Add nested OR group
builder.where
  .add('age', (node) => node.setOperator('>').setValue(18))
  .addGroup('or', (group) => {
    group
      .add('role', (node) => node.setOperator('=').setValue('admin'))
      .add('role', (node) => node.setOperator('=').setValue('super'))
  })

// Deep nesting
builder.where.addGroup('or', (outerGroup) => {
  outerGroup
    .add('status', (node) => node.setOperator('=').setValue('active'))
    .addGroup('and', (innerGroup) => {
      innerGroup
        .add('age', (node) => node.setOperator('>').setValue(18))
        .add('verified', (node) => node.setOperator('=').setValue(true))
    })
})
```

### Query Operations

```typescript
// Field-based search (recursive)
const node = builder.where.find('age')
if (node) {
  node.setValue(20)
}

// UUID-based search (precise)
const node = builder.where.findById('uuid-1')

// Get all leaf conditions (flattened)
const allConditions = builder.where.findAll()
// Returns: WhereFilterNodeBuilder[]

// Remove by field (recursive, removes first match)
builder.where.remove('age')

// Remove by UUID (precise)
builder.where.removeById('uuid-1')

// Clear all conditions
builder.where.clear()
```

### Group Operations

```typescript
// Change root logic
builder.where.setLogic("or")

// Change group logic
builder.where.addGroup("and", group => {
  group.setLogic("or")  // Change to OR
  group.add("field1", ...)
})

// Get group ID
builder.where.addGroup("or", group => {
  const groupId = group.getId()
  // Use groupId for later operations
})
```

### Observation

```typescript
// Observe changes
const unobserve = builder.where.observe((event) => {
  console.log('WhereFilters changed:', event)
})

// Stop observing
unobserve()
```

## Implementation Details

### UUID Generation

- Use `uuid` package (v4) for all IDs
- Generate at creation time (add, addGroup)
- Non-deterministic (accept snapshot variability)

### Recursive Operations

**find(field: string)**

- Depth-first search from current node
- Returns first match
- Searches both direct conditions and nested groups

**remove(field: string)**

- Depth-first search from current node
- Removes first match only
- Returns `this` for chaining

**findAll()**

- Recursively collects all leaf conditions
- Flattens nested structure
- Returns array of `WhereFilterNodeBuilder`

### Yjs Integration

- Root: `dsl.set('whereFilters', Y.Map)`
- Groups: `Y.Map` with `conditions: Y.Array`
- Conditions: `Y.Map` for each leaf
- All mutations wrapped in transactions for CRDT consistency

### Error Handling

- `findById(uuid)` returns `undefined` if not found
- `removeById(uuid)` silently succeeds if not found
- `find(field)` returns `undefined` if not found
- `remove(field)` returns `this` if not found
- No exceptions for missing items (defensive)

## Migration Strategy

### Breaking Changes

1. DSL structure changes from flat array to nested tree
2. `operator` field renamed to `op` in DSL
3. `update(field, callback)` removed (use `find(field)?.setValue()`)
4. `findAll()` now returns only leaf conditions (no groups)

### Migration Steps

1. Update all existing DSL to new nested format
2. Replace `update()` calls with `find()` + mutation
3. Update tests to expect new DSL structure
4. Update VQuery pipeline to handle new DSL

### No Backward Compatibility

- Old flat array format will not be supported
- No auto-migration utility provided
- Users must manually update their DSL

## Testing Strategy

### Unit Tests

- Test each class in isolation
- Mock Yjs structures where possible
- Cover edge cases: empty conditions, deep nesting, not found scenarios

### Integration Tests

- Test full builder workflow with real Yjs documents
- Verify DSL output matches expected structure
- Test observe() functionality with Yjs events

### Snapshot Tests

- Accept non-deterministic UUIDs in snapshots
- Use `.toMatchObject()` for partial matching
- Focus on structure, not exact UUID values

### Test Coverage Goals

- 100% line coverage for core logic
- All public API methods tested
- Recursive operations tested at depth 3+

## Performance Considerations

### Complexity

- `add()`: O(1) - append to array
- `addGroup()`: O(1) - append to array
- `find(field)`: O(n) - linear search with recursion
- `findById(uuid)`: O(n) - linear search with recursion
- `remove(field)`: O(n) - linear search + array splice
- `findAll()`: O(n) - full tree traversal

### Optimization Opportunities (Future)

- Index by field name for faster lookups
- Index by UUID for O(1) findById
- Lazy evaluation for findAll()
- Memoization for repeated queries

## Open Questions

None - all design decisions finalized.

## References

- VBI Architecture: `/packages/vbi/README.md`
- Yjs Documentation: https://docs.yjs.dev/
- UUID Package: https://www.npmjs.com/package/uuid

## Appendix: Complete API Reference

### WhereFiltersBuilder (Root)

```typescript
class WhereFiltersBuilder {
  // Add operations
  add(field: string, callback?: (node: WhereFilterNodeBuilder) => void): this
  addGroup(logic: 'and' | 'or', callback?: (group: WhereFilterGroupBuilder) => void): this

  // Query operations
  find(field: string): WhereFilterNodeBuilder | undefined
  findById(id: string): WhereFilterNodeBuilder | WhereFilterGroupBuilder | undefined
  findAll(): WhereFilterNodeBuilder[]

  // Mutation operations
  remove(field: string): this
  removeById(id: string): this
  clear(): this
  setLogic(logic: 'and' | 'or'): this

  // Utility operations
  toJson(): WhereFiltersRoot
  observe(callback: ObserveCallback): () => void
}
```

### WhereFilterGroupBuilder (Nested)

```typescript
class WhereFilterGroupBuilder {
  // Add operations
  add(field: string, callback?: (node: WhereFilterNodeBuilder) => void): this
  addGroup(logic: 'and' | 'or', callback?: (group: WhereFilterGroupBuilder) => void): this

  // Query operations
  find(field: string): WhereFilterNodeBuilder | undefined
  findById(id: string): WhereFilterNodeBuilder | WhereFilterGroupBuilder | undefined

  // Mutation operations
  remove(field: string): this
  removeById(id: string): this
  setLogic(logic: 'and' | 'or'): this
  getId(): string
}
```

### WhereFilterNodeBuilder (Leaf)

```typescript
class WhereFilterNodeBuilder {
  // Read operations
  getId(): string
  getField(): string

  // Mutation operations
  setField(field: string): this
  setOperator(op: string): this
  setValue(value: any): this

  // Utility operations
  toJson(): WhereFilterLeaf
}
```
