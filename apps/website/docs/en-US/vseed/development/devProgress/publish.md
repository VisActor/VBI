---
title: publish
---


# publish

## Generate changeset

To generate new changesets, execute pnpm changeset in the root directory of the repository. The generated markdown files in the.changeset directory should be committed to the repository.
```bash
pnpm changeset
```

After generating the changeset, execute git commit
```bash
git add .
git commit -m "chore: commit message"
```

The above process can be repeated multiple times, and the contents of each changeset will be accumulated until the final version is released.

## Updated version

Execute the following command to update the version and update the ChangeLog.
```bash
pnpm changeset version
```

Update dependencies and lock file
```bash
pnpm install
```

Commit changes
```bash
git add .
git commit -m "chore: release message"
git push
```

After the PR is merged into the main branch, the changesets workflow will be automatically triggered for packaging and publishing.