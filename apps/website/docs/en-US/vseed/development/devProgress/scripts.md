# Commonly used scripts

To maintain the consistency of Monorepo, **all scripts must be executed in the project root directory**.

## Core Script (g)

`g` (Generator) is the most critical auxiliary script in the development of VSeed.

```bash
pnpm run g
```

**Function description**:
This command is a combination of `build:test`, `build:docs`, and `build:api`, which is used to ensure resource synchronization in the development environment:
1. **Generate test cases**: Parse JSON Spec under `tests/integrations` and generate the corresponding `.test.ts` file.
2. **Generate document**: Parse the TypeScript type definition and update the API document in `apps/website`.

**Usage Scenario**:
- After modifying the chart logic or adding a new chart type.
- After modifying the TypeScript type definition.
- Before submitting code.

## Develop and build

### Start the development environment
Also start the VSeed listening and documentation site.
```bash
pnpm run dev
```

### Build project
Build the VSeed core library.
```bash
pnpm --filter=@visactor/vseed run build
```

## Test related

### Run all tests
```bash
pnpm --filter=@visactor/vseed run test
```

### Run unit tests
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### Run integration tests
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### Update test snapshot
Run when your code changes cause the snapshot to change (as expected):
```bash
pnpm --filter=@visactor/vseed run test:update
```

## Code quality

### Lint check
```bash
pnpm run lint
```

### Type checking
```bash
pnpm run typecheck
```
