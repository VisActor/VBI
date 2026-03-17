# 发布

## 生成 changeset

要生成新的 changesets，请在仓库的根目录中执行 pnpm changeset。 .changeset 目录中生成的 markdown 文件应被提交到存储库。

```bash
pnpm changeset
```

生成changeset后执行 git commit

```bash
git add .
git commit -m "chore: commit message"
```

上述过程可多次重复, 每一次的changeset内容都会被累加至最终的版本发布.

## 更新版本

执行如下命令更新版本, 并更新ChangeLog。

```bash
pnpm changeset version
```

更新依赖和lock file

```bash
pnpm install
```

提交更改

```bash
git add .
git commit -m "chore: release message"
git push
```

PR合入至main分支后, 会自动触发 changesets workflow, 进行打包与发布工作.
