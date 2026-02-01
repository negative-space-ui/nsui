import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'

export default defineConfig({
  plugins: { js },
  extends: ['js/recommended', tseslint.configs.recommended, pluginReact.configs.flat.recommended],
  languageOptions: { globals: globals.node },
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    'react/prop-types': 'off'
  }
})
