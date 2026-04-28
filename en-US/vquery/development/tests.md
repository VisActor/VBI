# Testing Workflow

VQuery uses the `rstest` framework for testing. **All commands must be run from the root directory.**

## Test Mechanisms

VQuery's tests cover:

- **Unit**: Utility functions and compiler logic.
- **Examples**: Complete SQL generation and data query flows.

## Common Commands

### Run All Tests

```bash
pnpm --filter=@visactor/vquery run test
```

### Update Snapshots

If SQL generation logic changes are expected, update snapshots:

```bash
pnpm --filter=@visactor/vquery run test:update
```

### Coverage Report

Generate and view test coverage:

```bash
pnpm --filter=@visactor/vquery run test:coverage
```
