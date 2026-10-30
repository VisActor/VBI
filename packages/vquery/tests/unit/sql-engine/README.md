# VQuery SQL engine conformance suite

The SQLLogicTest runner uses records from the DuckDB repository as an external correctness oracle. Its `cases/` corpus does not contain a VQuery-authored fixture or hand-calculated expected result.

## Provenance

- Repository: `duckdb/duckdb`
- Pinned commit: `7560f8256d70d36d8f0185222567939c48d78257`
- Upstream test root: `test/sql`
- License: DuckDB MIT license, reproduced in `DUCKDB-LICENSE`
- Current selection: 27 upstream source files in 26 case files, 122 queries, 43 successful setup statements, and 12 expected-error statements

Every file in `cases/` names its original upstream path. The selected SQLLogicTest record blocks preserve the upstream setup SQL, query SQL, result ordering declaration, and expected output. Only records within the VQuery in-memory engine's supported `SELECT` boundary are vendored; unsupported DuckDB features are omitted as whole records rather than rewritten.

## Runner boundary

The runner turns upstream fixture statements into in-memory rows and sends each upstream `SELECT` through the production `parseSQL` and `executeSQL` functions. It supports the setup forms used by this selection:

- `CREATE TABLE` with explicit columns
- `INSERT INTO ... VALUES`
- the upstream `range(...)` fixture used by quantile and median tests
- inline `FROM VALUES` fixtures

DuckDB allows computed result columns without aliases, while VQuery's production adapter requires aliases. After parsing, the runner assigns private output keys to otherwise unnamed expressions solely so it can read the result cells; the SQL stored in `cases/` and its semantics are unchanged.

## Updating the corpus

1. Pin a concrete DuckDB commit; never track a moving branch.
2. Copy complete upstream record blocks without editing their data SQL, query SQL, or expected output.
3. Add the source path and commit to the case header.
4. If a record fails, fix the engine or omit the unsupported record as a whole. Do not change the upstream expected result to match VQuery.
5. Run `pnpm --filter=@visactor/vquery test`.

This policy is deliberate: the same implementation assumption must never define both the engine behavior and its expected result.

## MySQL numeric and AST checks

`mysql-numeric-reference.test.ts` verifies 50 numeric cases with independently obtained MySQL expected values. `numeric-ast-roundtrip.test.ts` checks exact reconstruction of 1,000 deterministic ASTs.
