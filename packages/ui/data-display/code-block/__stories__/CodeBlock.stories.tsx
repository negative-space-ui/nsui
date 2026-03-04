import React from 'react'
import { CodeBlock, type CodeBlockProps } from '../src'

export default {
  title: 'Data Display/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  args: {
    children:
      'import React from "react"\n\nconst App = () => {\n  return <div>Hello, World!</div>\n'
  }
}

export const Default: React.FC<CodeBlockProps> = (args) => <CodeBlock {...args} />
