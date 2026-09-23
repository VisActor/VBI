import path from 'path'
import { Project } from 'ts-morph'
import fs from 'fs'

const project = new Project()
const dir = path.resolve(__dirname, '../../packages/vseed/src/types/chartType/')
const outDir = path.resolve(__dirname, './top-key')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir)
}
const files = fs.readdirSync(dir, { recursive: true })
files.forEach((file: any) => {
  // console.log(file, typeof file);
  if (!file.endsWith('.ts') || file.endsWith('index.ts')) {
    return
  }

  const chartType = file.split('/')[0]
  const className = chartType.charAt(0).toUpperCase() + chartType.slice(1)
  const sourceFileDir = project.addSourceFileAtPath(path.resolve(dir, file))
  const areaInterface = sourceFileDir.getInterface(className)
  if (areaInterface) {
    const keyPaths: any[] = []
    const properties = areaInterface.getProperties()
    properties.forEach((property) => {
      const keyPath: any = {}
      const name = property.getName()
      // console.log(`name: ${name}`);
      if (name === 'chartType') {
        return
      }
      keyPath.name = name
      const type = property.getTypeNode()?.getText()
      const datasetTypes = type?.split(' | ') as string[]
      // 取第一个不是基础类型的
      const datasetType =
        datasetTypes.find(
          (type) => !type.includes('number') && !type.includes('string') && !type.includes('boolean'),
        ) || datasetTypes[0]
      // console.log(`datasetType: ${datasetType}`);
      if (
        datasetType !== 'number' &&
        datasetType !== 'string' &&
        datasetType !== 'boolean' &&
        !datasetType?.startsWith("'")
      ) {
        // 移除数组标记 []
        keyPath.componentName = datasetType?.replace(/\[\]$/, '')
      }
      keyPath.type = type
      const jsDoc = property.getJsDocs()
      if (jsDoc.length > 0) {
        // all tag
        const allTag = jsDoc[0]?.getTags()
        // console.log(allTag?.map(tag => tag.getTagName()))
        const descriptionTag = allTag?.find((tag) => tag.getTagName() === 'description')
        keyPath.description = descriptionTag?.getCommentText() || jsDoc[0]?.getDescription().trim()
      }

      keyPaths.push(keyPath)
    })

    // 保存文件
    fs.writeFileSync(path.resolve(outDir, `${chartType}.json`), JSON.stringify(keyPaths, null, 2))
  }
})

console.log('generate top key success')
