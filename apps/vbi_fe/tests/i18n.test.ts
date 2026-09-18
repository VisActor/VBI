import { describe, expect, test } from '@rstest/core'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as ts from 'typescript'
import { useAppPreferencesStore } from './application-test-stores'

const testDir = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(testDir, '..')
const localesDir = path.join(packageRoot, 'src/i18n/locales')
const sourceDir = path.join(packageRoot, 'src')

const readLocaleMessages = () =>
  Object.fromEntries(
    fs
      .readdirSync(localesDir)
      .filter((file) => file.endsWith('.json'))
      .sort()
      .map((file) => [
        file,
        JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8')) as Record<string, string>,
      ]),
  )

const walkSourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walkSourceFiles(fullPath)
    return /\.(ts|tsx)$/.test(entry.name) ? [fullPath] : []
  })

const translationFunctionKeyIndex = {
  t: 0,
  tRuntime: 0,
  translate: 1,
} as const

const isTranslationFunctionName = (name: string): name is keyof typeof translationFunctionKeyIndex =>
  name in translationFunctionKeyIndex

const isStringLiteralLike = (node: ts.Node): node is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral =>
  ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)

const collectTranslationKeysFromSource = (source: string, fileName: string) => {
  const keys = new Set<string>()
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

  const visit = (node: ts.Node) => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const functionName = node.expression.text
      if (isTranslationFunctionName(functionName)) {
        const keyArgument = node.arguments[translationFunctionKeyIndex[functionName]]
        if (keyArgument && isStringLiteralLike(keyArgument)) keys.add(keyArgument.text)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return keys
}

const collectLiteralTranslationKeys = () => {
  const keys = new Set<string>()
  for (const file of walkSourceFiles(sourceDir)) {
    const source = fs.readFileSync(file, 'utf8')
    collectTranslationKeysFromSource(source, file).forEach((key) => keys.add(key))
  }

  return [...keys].filter(Boolean).sort()
}

const userFacingSourceDirectories = new Set(['app', 'components', 'views'])
const isUserFacingSourceFile = (file: string) =>
  userFacingSourceDirectories.has(path.relative(sourceDir, file).split(path.sep)[0] ?? '')
const userFacingAttributeNames = new Set([
  'alt',
  'aria-label',
  'cancelLabel',
  'confirmLabel',
  'description',
  'emptyLabel',
  'label',
  'message',
  'placeholder',
  'title',
])
const userFacingPropertyNames = new Set([
  'description',
  'display',
  'fallbackTitle',
  'label',
  'message',
  'placeholder',
  'summary',
  'title',
])

const isHumanReadableLiteral = (value: string) =>
  /[A-Za-z\u4e00-\u9fff]/.test(value) &&
  !/^(GET|POST|PATCH|DELETE|Content-Type|application\/json|localhost|https?|[a-z0-9._/-]+)$/.test(value) &&
  !/^[@./#?&:=\w-]+$/.test(value)

const getNodeLocation = (sourceFile: ts.SourceFile, node: ts.Node) => {
  const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
  return `${path.relative(packageRoot, sourceFile.fileName)}:${line + 1}`
}

const collectHardcodedUserFacingMessagesFromSource = (source: string, fileName: string) => {
  const messages: { location: string; text: string }[] = []
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const addMessage = (node: ts.Node, text: string) => {
    const normalizedText = text.replace(/\s+/g, ' ').trim()
    if (normalizedText && isHumanReadableLiteral(normalizedText)) {
      messages.push({ location: getNodeLocation(sourceFile, node), text: normalizedText })
    }
  }

  const visit = (node: ts.Node) => {
    if (ts.isJsxText(node)) addMessage(node, node.getText(sourceFile))

    if (ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const attributeName = node.name.getText(sourceFile)
      if (userFacingAttributeNames.has(attributeName)) addMessage(node, node.initializer.text)
    }

    if (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name))) {
      const propertyName = ts.isIdentifier(node.name) ? node.name.text : node.name.text
      if (
        userFacingPropertyNames.has(propertyName) &&
        (ts.isStringLiteral(node.initializer) || ts.isNoSubstitutionTemplateLiteral(node.initializer))
      ) {
        addMessage(node, node.initializer.text)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return messages
}

const collectHardcodedUserFacingMessages = () =>
  walkSourceFiles(sourceDir)
    .filter(isUserFacingSourceFile)
    .flatMap((file) => collectHardcodedUserFacingMessagesFromSource(fs.readFileSync(file, 'utf8'), file))

const dynamicTranslationKeys = [
  'app.language.de',
  'app.language.en',
  'app.language.fr',
  'app.language.id',
  'app.language.ja',
  'app.language.ko',
  'app.language.vi',
  'app.language.zh',
  'app.theme.amber',
  'app.theme.blue',
  'app.theme.copper',
  'app.theme.crimson',
  'app.theme.dark',
  'app.theme.emerald',
  'app.theme.forest',
  'app.theme.light',
  'app.theme.midnight',
  'app.theme.plum',
  'app.theme.rose',
  'app.theme.slate',
  'app.theme.violet',
  'app.theme.zinc',
  'resource.chart',
  'resource.insight',
]

describe('i18n messages', () => {
  test('keep locale files in lockstep', () => {
    const localeMessages = readLocaleMessages()
    const allKeys = [...new Set(Object.values(localeMessages).flatMap((messages) => Object.keys(messages)))].sort()

    for (const [file, messages] of Object.entries(localeMessages)) {
      expect({ file, keys: Object.keys(messages).sort() }).toEqual({ file, keys: allKeys })
    }
  })

  test('cover every translation key used by the app', () => {
    const localeMessages = readLocaleMessages()
    const allUsedKeys = [...new Set([...collectLiteralTranslationKeys(), ...dynamicTranslationKeys])].sort()

    for (const [file, messages] of Object.entries(localeMessages)) {
      const missingKeys = allUsedKeys.filter((key) => !(key in messages))
      expect({ file, missingKeys }).toEqual({ file, missingKeys: [] })
    }
  })

  test('route visible UI copy through i18n messages', () => {
    expect(collectHardcodedUserFacingMessages()).toEqual([])
  })

  test('persist user locale and theme selections in browser storage', () => {
    window.localStorage.clear()
    document.cookie = 'vbi.locale=; path=/; max-age=0'
    document.cookie = 'vbi.theme=; path=/; max-age=0'

    useAppPreferencesStore.getState().setLocale('ja-JP')
    useAppPreferencesStore.getState().setThemeMode('midnight')

    expect(window.localStorage.getItem('vbi.locale')).toBe('ja-JP')
    expect(window.localStorage.getItem('vbi.theme')).toBe('midnight')
    expect(document.cookie).toContain('vbi.locale=ja-JP')
    expect(document.cookie).toContain('vbi.theme=midnight')
  })
})
