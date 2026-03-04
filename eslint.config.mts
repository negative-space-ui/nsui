import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default defineConfig({
  plugins: { js, 'simple-import-sort': simpleImportSort },
  extends: ['js/recommended', tseslint.configs.recommended, pluginReact.configs.flat.recommended],
  languageOptions: { globals: globals.node },
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
})
