import '../global.d.ts'
import './globals.css'

import { NSUIProvider } from '@negative-space/provider'
import type { Preview } from '@storybook/nextjs-vite'
import React from 'react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <NSUIProvider>
        <Story />
      </NSUIProvider>
    )
  ]
}

export default preview
