# Development Workflow

## Start the Project

```bash title="Start Project"
pnpm install && pnpm dev
```

## Understand Requirements and Write Code

This is a complex process, but generally involves three things:

1. Define the input: `vseed`
2. Define the output: `vseed` → `advancedVSeed`, or `advancedVSeed` → `spec`
3. Write code to ensure new inputs produce the expected outputs

:::tip
The `playground` (`apps/website/docs/zh-CN/playground/index.mdx`) can be used for debugging and development.
:::

## Create New Test Cases

If necessary, consider creating new test cases.

:::tip
When test coverage decreases, new test cases are required.
:::

In the `packages/vseed/tests/*` directory, create a new `testName.json` file and write a VSeed DSL.

Then run:

```bash title="Create Test Case"
pnpm build:canvasTest
```

## Run Unit Tests and Update Coverage

```bash title="Run Unit Tests and Update Coverage"
pnpm test:coverage
```

Ensure three things:

1. All tests pass
2. Snapshot changes are as expected
3. Coverage has not decreased

> Coverage changes will be automatically updated to README.md

## Update Options Documentation

If you modify TypeScript definitions for chart types, please update the options documentation.

:::tip
All type definitions under `packages/vseed/src/types/chartType` correspond to the options documentation for each chart. If changes are made, please update accordingly.
:::

```bash title="Update Options Documentation"
pnpm build:docs
```

## Publish and Submit

```bash title="Describe Changes"
pnpm changeset
```

After running `pnpm changeset`, follow the prompts to:

1. Select the packages to change — in most cases, only vseed
2. Follow semantic versioning: press Enter twice to skip `major` and `minor`, then select `patch`
3. Enter a change description, e.g.: `fix: chart render error caused by only one measure`

:::tip Recommendation
One feature or bugfix → one `changeset` → one `commit`

One `Pull Request` → one `issue`

One `Pull Request` can contain multiple features or bugfixes → multiple `changeset`s → multiple `commit`s
:::

## Commit

```bash title="Commit Everything"
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
