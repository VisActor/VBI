import fs from 'node:fs'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const OUTPUT_DIR = path.resolve(__dirname, '../../../apps/website/docs/public/storybook')

function runCommand(command, env = {}) {
  execSync(command, {
    stdio: 'inherit',
    env: { ...process.env, ...env },
  })
}

function buildStorybooks() {
  console.log('🚀 Building web-component')
  runCommand('pnpm build')

  const locales = JSON.parse(fs.readFileSync(path.resolve(OUTPUT_DIR, '../../../locales.json'), 'utf8'))
  for (const locale of locales) {
    console.log(`🚀 Building Storybook (${locale})...`)
    runCommand(`pnpm exec storybook build -o "${OUTPUT_DIR}/${locale}"`, { STORYBOOK_LOCALE: locale })
  }

  console.log(`\n✅ All Storybooks built successfully directly into:\n📁 ${OUTPUT_DIR}`)
}

buildStorybooks()
