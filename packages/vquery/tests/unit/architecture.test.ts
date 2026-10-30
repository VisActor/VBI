import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const source = fileURLToPath(new URL('../../src/', import.meta.url))
const files = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name)
    return entry.isDirectory() ? files(file) : file.endsWith('.ts') ? [file] : []
  })
const relative = (file: string) => path.relative(source, file).split(path.sep).join('/')
const graph = new Map(
  files(source).map((file) => {
    const dependencies = [
      ...readFileSync(file, 'utf8').matchAll(
        /^\s*(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]/gm,
      ),
    ].map(([, specifier]) => {
      if (!specifier.startsWith('.')) return specifier
      const base = path.resolve(path.dirname(file), specifier)
      const resolved = [base + '.ts', path.join(base, 'index.ts')].find(existsSync)
      if (!resolved) throw new Error(`Unresolved dependency: ${relative(file)} -> ${specifier}`)
      return relative(resolved)
    })
    return [relative(file), dependencies]
  }),
)

it('keeps SQL syntax, compilation, data sources and adapters within their dependency boundaries', () => {
  const rules: Array<[RegExp, RegExp]> = [
    [/^types\//, /^types\//],
    [/^sql\/ast\.ts$/, /$^/],
    [/^sql\/parser\.ts$/, /^sql\/ast\.ts$/],
    [/^sql\/numericExpression\.ts$/, /^(types\/|sql\/(ast|parser)\.ts$)/],
    [/^sql\/compiler\//, /^(kysely$|types\/|sql\/(compiler\/|(ast|numericExpression)\.ts$))/],
    [/^dataset\/source\//, /^(types\/|dataset\/(source\/|types\.ts$))/],
    [/^dataset\/dataset\.ts$/, /^(types\/|dataset\/source\/|sql\/compiler\/)/],
    [/^adapters\/storage\//, /^(types\/|adapters\/storage\/)/],
    [
      /^adapters\/query\/in-memory\//,
      /^(types\/|dataset\/(source\/|types\.ts$)|sql\/(ast|parser)\.ts$|adapters\/query\/in-memory\/)/,
    ],
    [/^VQuery\.ts$/, /^(types\/|dataset\/|sql\/numericExpression\.ts$)/],
  ]
  for (const [file, dependencies] of graph) {
    const rule = rules.find(([owner]) => owner.test(file))
    if (!rule) continue
    for (const dependency of dependencies) {
      expect(rule[1].test(dependency), `${file} -> ${dependency}`).toBe(true)
    }
  }
})

it('has no local import or re-export cycles, including type dependencies', () => {
  const complete = new Set<string>()
  const visit = (file: string, route: string[]) => {
    expect(route.includes(file), [...route, file].join(' -> ')).toBe(false)
    if (complete.has(file)) return
    for (const dependency of graph.get(file) ?? []) {
      if (graph.has(dependency)) visit(dependency, [...route, file])
    }
    complete.add(file)
  }
  for (const file of graph.keys()) visit(file, [])
})
