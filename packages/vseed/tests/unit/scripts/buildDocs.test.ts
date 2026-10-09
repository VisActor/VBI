import { describe, expect, it } from 'vitest'
import { execFileSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

describe('union property documentation', () => {
  it('documents selectable fields instead of their mutually exclusive never branches', () => {
    const fixture = `interface Chart {
        annotation: { selector: string; range?: never } | {
          selector?: never
          range: { x: number; y?: number } | { x?: number; y: number }
        }
      }`
    const markdown = execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `
        import { DocsGenerator } from './scripts/build-docs.mjs'
        const generator = new DocsGenerator({})
        const file = generator.project.createSourceFile('annotation-docs-fixture.ts', ${JSON.stringify(fixture)})
        const property = file.getInterfaceOrThrow('Chart').getPropertyOrThrow('annotation')
        process.stdout.write(generator.generateSubProperties(property, 2, new Set()))
      `,
      ],
      { encoding: 'utf8', cwd: resolve(dirname(fileURLToPath(import.meta.url)), '../../..') },
    )

    expect(markdown).toContain('### selector\n\n**Type:** `string | undefined`')
    expect(markdown).toMatch(/### range\n\n\*\*Type:\*\* `[^\n]*\| undefined`/)
    expect(markdown).toContain('#### x\n\n**Type:** `number | undefined`')
    expect(markdown).toContain('#### y\n\n**Type:** `number | undefined`')
    expect(markdown).not.toContain('**Type:** `undefined`')
  })
})
