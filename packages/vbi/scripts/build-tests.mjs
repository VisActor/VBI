import fs from 'fs'
import path from 'path'
import {
  BUILDER_ORDER,
  EXAMPLES_DIR,
  MOCK_SYSTEM_TIME,
  findJsonFilesInDir,
  findSubDirs,
  formatBuilderLabel,
  formatDirLabel,
  getDirBuilderKind,
  getTestImports,
  renderTestCase,
} from './example-utils.mjs'

function generateTestFile(dirName, testsDir) {
  const dirPath = path.join(EXAMPLES_DIR, dirName)
  const jsonFiles = findJsonFilesInDir(dirPath)

  if (!jsonFiles.length) {
    return null
  }

  const testCases = jsonFiles
    .map((jsonPath) => renderTestCase(JSON.parse(fs.readFileSync(jsonPath, 'utf-8')), jsonPath))
    .join('\n')
  const relativePath = path.relative(dirPath, testsDir)
  const connectorImport = relativePath === '' ? "'./demoConnector'" : `'${relativePath}/demoConnector'`
  const builderKind = getDirBuilderKind(dirName)
  const suiteLabel =
    builderKind === dirName
      ? formatDirLabel(dirName)
      : `${formatBuilderLabel(builderKind)} / ${formatDirLabel(dirName)}`
  const template = `import { rs } from '@rstest/core'
${getTestImports(builderKind)}
import { registerDemoConnector } from ${connectorImport}

const MOCK_SYSTEM_TIME = new Date('${MOCK_SYSTEM_TIME}')

describe('${suiteLabel}', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })
${testCases}
})
`

  const testPath = path.join(dirPath, `${dirName}.test.ts`)
  fs.writeFileSync(testPath, template, 'utf-8')
  console.log(`Generated: ${testPath}`)
  return testPath
}

function buildTests() {
  console.log('Building tests from JSON files...')

  const testsDir = path.resolve(EXAMPLES_DIR, '..')
  const requestedBuilder = process.argv.find((arg) => arg.startsWith('--builder='))?.split('=')[1]
  if (requestedBuilder && !BUILDER_ORDER.includes(requestedBuilder)) {
    throw new Error(`Unknown builder: ${requestedBuilder}`)
  }
  const subDirs = findSubDirs(EXAMPLES_DIR).filter(
    (dir) =>
      findJsonFilesInDir(path.join(EXAMPLES_DIR, dir)).length > 0 &&
      (!requestedBuilder || getDirBuilderKind(dir) === requestedBuilder),
  )
  let totalTests = 0

  for (const dir of subDirs) {
    const testPath = path.join(EXAMPLES_DIR, dir, `${dir}.test.ts`)
    if (fs.existsSync(testPath)) {
      fs.rmSync(testPath)
    }
    if (generateTestFile(dir, testsDir)) {
      totalTests += findJsonFilesInDir(path.join(EXAMPLES_DIR, dir)).length
    }
  }

  console.log(`Generated test files for ${totalTests} examples in ${subDirs.length} categories`)
}

buildTests()
