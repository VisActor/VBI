# Common Scripts

To maintain Monorepo consistency, **all scripts must be run from the project root directory**.

## Core Script (g)

```bash
pnpm run g
```

**Description**: VQuery's `g` script handles:

1. `build:test`: Compile test resources.
2. `build:docs`: Generate API documentation.

## Development & Build

### Build

```bash
pnpm --filter=@visactor/vquery run build
```

## Testing

### Run Tests

VQuery uses Rstest for testing.

```bash
pnpm --filter=@visactor/vquery run test
```

### Update Snapshots

```bash
pnpm --filter=@visactor/vquery run test:update
```

### Coverage

```bash
pnpm --filter=@visactor/vquery run test:coverage
```
