import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['**/.next/**', '**/dist/**', '**/node_modules/**']),

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],

    plugins: {
      'simple-import-sort': simpleImportSort
    },

    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  }
])
