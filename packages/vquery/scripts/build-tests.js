import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const examplesDir = path.resolve(__dirname, '../tests/examples')

function scanDir(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`)
    return
  }

  const files = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    const res = path.resolve(dir, file.name)
    if (file.isDirectory()) {
      scanDir(res)
    } else if (file.name.endsWith('.json')) {
      generateTest(res)
    }
  }
}

function generateTest(jsonPath) {
  try {
    const content = fs.readFileSync(jsonPath, 'utf-8')
    const json = JSON.parse(content)
    const description = json.description || path.basename(jsonPath, '.json')
    const jsonFileName = path.basename(jsonPath)
    const testFileName = jsonFileName.replace('.json', '.test.ts')
    const testPath = path.join(path.dirname(jsonPath), testFileName)

    const template = `import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './${jsonFileName}'

describe('${description}', () => {
  it('${description}', async () => {
    const vquery = new VQuery()
    const { datasetId, schema, dataset: rawDataset, vquery: vqueryDSL } = vqueryConfig

    if (await vquery.hasDataset(datasetId)) {
      await vquery.dropDataset(datasetId)
    }

    if (!(await vquery.hasDataset(datasetId))) {
      await vquery.createDataset(datasetId, schema as DatasetColumn[], { type: 'json', rawDataset })
    }

    const dataset = await vquery.connectDataset(datasetId)

    const sql = convertDSLToDuckDB(vqueryDSL as VQueryDSL<Record<string, string | number>>, datasetId)

    expect(sql).toMatchInlineSnapshot()

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot()
  })
})
`

    // Check if file exists to preserve snapshot if needed?
    // User requested "generate corresponding test", usually implies overwriting or creating.
    // However, toMatchInlineSnapshot relies on the file content.
    // If we overwrite, we lose the snapshot.
    // But since this is a "build" script, it might be intended to regenerate.
    // If the file exists, we could check if it has a snapshot and try to keep it, but that's complex parsing.
    // Standard approach for codegen is overwrite. User runs 'test:update' to regenerate snapshots.

    fs.writeFileSync(testPath, template, 'utf-8')
    console.log(`Generated ${testFileName}`)
  } catch (error) {
    console.error(`Error processing ${jsonPath}:`, error)
  }
}

console.log('Building tests...')
scanDir(examplesDir)
console.log('Done.')
