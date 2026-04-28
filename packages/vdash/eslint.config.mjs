import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  { languageOptions: { globals: globals.browser, parserOptions: { tsconfigRootDir: import.meta.dirname } } },
  ...defineConfig(js.configs.recommended, tseslint.configs.recommended),
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  { ignores: ['dist/', 'coverage/'] },
]
