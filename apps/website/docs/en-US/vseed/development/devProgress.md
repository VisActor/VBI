# Development process

## Start project

```bash title="Start the Project"
pnpm install && pnpm dev
``` 

## Understand the requirements and write the code

It's a complicated process, but generally, it's three things:
1. Enter explicitly, `vseed`
2. Clear output, `vseed` is converted to `advancedVSeed`, or `advancedVSeed` is converted to `spec`
3. Write code to ensure that new inputs have expected outputs

:::tip
`playground(apps/website/docs/zh-CN/playground/index.mdx)`, can be debugged and developed.

:::

## Create new test case

If necessary, you can consider creating a new test case

:::tip
When coverage decreases, new test cases need to be created

:::

In the `packages/vseed/tests/*` directory, create a new `testName.json` and write vseed DSL.

execute

```bash title="Create Test Cases"
pnpm build:canvasTest
```

## Execute unit tests and update coverage

```bash title="Run Unit Tests and Update Coverage"
pnpm test:coverage
```

Make sure 3 things
1. All tests passed
2. Snapshot changes are in line with expectations
3. No decrease in coverage

> Coverage changes will be automatically updated to README.md

## Update configuration item document

If the TypeScript definition of the chart type is modified, please update the configuration item document.

:::tip
All type definitions under `packages/vseed/src/types/chartType` correspond to the configuration item document of each chart. If there are any changes, please be sure to update them.

:::

```bash title="Update Option Documentation"
pnpm build:docs
```

## Publish and Submit

```bash title="Describe Changes"
pnpm changeset
```

After executing the `pnpm changeset` command, choose to perform the following operations according to the prompts
1. Select the package that needs to be changed. Generally, only vseed
2. Follow the semantic version and select the change type. In most cases, press the Enter key twice in succession. After skipping `major` and `minor`, select `patch`.
2. Enter the change description, for example: `fix: chart render error caused by only one measure`

:::tip suggestions
A function or bugfix corresponds to a `changeset`, which corresponds to a `commit`

One `Pull Request`, corresponding to one `issue`

One `Pull Request` corresponds to multiple functions or multiple Bugfixes, corresponds to multiple `changeset`, corresponds to multiple `commit`

:::

## Submit

```bash title="Commit Everything"
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
