import React from 'react'

import { FileTree, type FileTreeProps } from '../src'

export default {
  title: 'Navigation/File tree',
  component: FileTree,
  tags: ['autodocs'],
  args: {
    classNames: {
      folders: {
        collapseButton: {
          icon: 'w-5 h-5 text-gray-600 transition-transform duration-300 ease-in-out'
        },
        children: 'ml-5'
      },
      items: {
        root: 'ml-5'
      }
    },
    items: [
      {
        folder: {
          prefix: '📁',
          label: 'Folder 1'
        },
        items: [
          { item: { prefix: '📄', label: 'Item 1' } },
          { item: { prefix: '📄', label: 'Item 2' } }
        ]
      },
      {
        folder: {
          prefix: '📁',
          label: 'Folder 2'
        },
        items: [{ item: { prefix: '📄', label: 'Item 3' } }]
      },
      {
        item: {
          prefix: '📄',
          label: 'Item 4'
        }
      }
    ]
  }
}

export const Default = (args: FileTreeProps) => <FileTree {...args} />
