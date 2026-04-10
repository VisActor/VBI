# Publish

## Generate Changeset

To generate new changesets, please run `pnpm changeset` in the root directory of the repository. The resulting markdown files generated in the `.changeset` directory should be committed to the repository.

```bash
pnpm changeset
```

After generating the changeset, perform a `git commit`:

```bash
git add .
git commit -m "chore: commit message"
```

The above process can be repeated multiple times. The content of each changeset will be accumulated in the final version publish.

## Update Version

Run the following command to update the version and the ChangeLog.

```bash
pnpm changeset version
```

Update dependencies and the lock file:

```bash
pnpm install
```

Commit changes:

```bash
git add .
git commit -m "chore: release message"
git push
```

After the PR is merged into the `main` branch, the changesets workflow will be triggered automatically to perform the packaging and publishing task.
