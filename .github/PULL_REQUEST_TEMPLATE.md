<!--
First of all, thank you for your contribution! 😄
For requesting to pull a new feature or bugfix, please send it from a feature/bugfix branch based on the `main` branch.
Before submitting your pull request, please make sure the checklist below is confirmed.
Your pull requests will be merged after one of the collaborators approve.
Thank you!
-->

[中文版模板 / Chinese template](./PULL_REQUEST_TEMPLATE/pr_cn.md)

### 🤔 This is a ...

- [ ] New feature
- [ ] Bug fix
- [ ] TypeScript definition update
- [ ] Bundle size optimization
- [ ] Performance optimization
- [ ] Enhancement feature
- [ ] Refactoring
- [ ] Update dependency
- [ ] Code style optimization
- [ ] Test Case
- [ ] Branch merge
- [ ] Release
- [ ] Site / documentation update
- [ ] Demo update
- [ ] Workflow
- [ ] Other (about what?)

### 🔗 Related issue link

<!--
1. Put the related issue or discussion links here.
2. close #xxxx or fix #xxxx for instance.
-->

### 🔗 Related PR link

<!-- Put the related PR links here. -->

### 🐞 Bugserver case id

Only provide confirmed, public-safe case IDs. If unavailable, state that a product administrator must supply them. Only that product’s administrators may create cases; never use empty, placeholder or invented IDs. [Collaboration guide](../packages/vseed/__tests__/visual/BUGSERVER_CASE_WORKFLOW.md) (Chinese).

### 💡 Background and solution

<!--
1. Describe the problem and the scenario.
2. GIF or snapshot should be provided if includes UI/interactive modification.
3. How to fix the problem, and list the final API implementation and usage sample if that is a new feature.
-->

### ☑️ Self-Check before Merge

Read [PR checks and merge process](../CONTRIBUTING.md#pr-checks-and-merge-process). Target `main`; the advisory workflow accepts eligible same-repository, non-draft PRs created after 2026-11-06 22:05 Asia/Shanghai and touching packages/vseed/.

- [ ] Reported actual commands, outcomes, report scope and skipped checks/reasons.
- [ ] Ran relevant unit tests and full official-baseline comparison for product/dependency/case changes, or explained documentation-only applicability. Self-comparison is not a two-sided pass.
- [ ] Described expected visual changes and regression coverage; retained execution errors and blockers.

Photo needs maintainer review. Report-only/completed is not an all-Photo pass; approval is tied to the current commit and never automatically merges or updates baselines.

⚠️ Please check all items below before requesting a reviewing. ⚠️

- [ ] Doc is updated/provided or not needed
- [ ] Demo is updated/provided or not needed
- [ ] TypeScript definition is updated/provided or not needed
- [ ] Changelog is provided or not needed
