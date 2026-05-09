# Commonly used scripts

To maintain the consistency of Monorepo, **all scripts must be executed in the project root directory**.

## Core Script (g)

```bash
pnpm run g
```
**Function Description**: The `g` script of VQuery is responsible for:
1. `build:test`: Compile test resources.
2. `build:docs`: Generate API document.

## Develop and build

### Build
```bash
pnpm --filter=@visactor/vquery run build
```

## Test

### Run the test
VQuery Use Rstest for testing.
```bash
pnpm --filter=@visactor/vquery run test
```

### Update snapshot
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Coverage
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
