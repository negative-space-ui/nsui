import type { StorybookConfig } from '@storybook/nextjs-vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: ['../../../packages/ui/*/*/__stories__/*.stories.tsx'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs')
  ],
  framework: getAbsolutePath('@storybook/nextjs-vite'),
  viteFinal: async (configVite) => {
    configVite.resolve = {
      ...configVite.resolve,
      alias: {
        ...configVite.resolve?.alias,
        '@negative-space/*': resolve(__dirname, '../../../packages/*/*/src')
      }
    }
    return configVite
  }
}

export default config
