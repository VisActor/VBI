import { mysqlStrategy, duckdbStrategy } from '../../../../src/sql/compiler/dialect'
import { Kysely } from 'kysely'

for (const [name, strategy] of Object.entries({ mysql: mysqlStrategy, duckdb: duckdbStrategy })) {
  it(`${name} compiles without a database driver or live schema`, async () => {
    const { dialect } = strategy
    const db = new Kysely<{ t: { id: number } }>({ dialect })
    const introspector = dialect.createIntrospector(db)
    expect(await introspector.getSchemas()).toEqual([])
    expect(await introspector.getTables()).toEqual([])
    expect(await introspector.getMetadata()).toEqual({ tables: [] })
    expect(dialect.createDriver()).toBeDefined()
    expect(dialect.createQueryCompiler()).toBeDefined()
    expect(dialect.createAdapter()).toBeDefined()
    await db.destroy()
  })
}
