# Common Scripts

To maintain Monorepo consistency, **all scripts must be run from the project root directory**.

## Core Script (g)

`g` (Generator) is the most critical helper script in VSeed development.

```bash
pnpm run g
```

**Description**:
This command is a combination of `build:test`, `build:docs`, and `build:api`, used to keep development environment resources in sync:

1. **Generate test cases**: Parses JSON Specs under `tests/integrations` and generates corresponding `.test.ts` files.
2. **Generate documentation**: Parses TypeScript type definitions and updates API documentation in `apps/website`.

**When to use**:

- After modifying chart logic or adding a new chart type.
- After modifying TypeScript type definitions.
- Before committing code.

## Development & Build

### Start Development Environment

Start VSeed watch mode and the documentation site simultaneously.

```bash
pnpm run dev
```

### Build the Project

Build the VSeed core library.

```bash
pnpm --filter=@visactor/vseed run build
```

## Testing

### Run All Tests

```bash
pnpm --filter=@visactor/vseed run test
```

### Run Unit Tests

```bash
pnpm --filter=@visactor/vseed run test:unit
```

### Run Integration Tests

```bash
pnpm --filter=@visactor/vseed run test:integration
```

### Update Test Snapshots

Run this when your code changes cause snapshot diffs (that are expected):

```bash
pnpm --filter=@visactor/vseed run test:update
```

## Code Quality

### Lint Check

```bash
pnpm run lint
```

### Type Check

```bash
pnpm run typecheck
```
