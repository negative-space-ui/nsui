import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { FileTreeFolder, type FileTreeFolderProps } from './FileTreeFolder'
import { FileTreeItem, type FileTreeItemProps } from './FileTreeItem'

export type FileTreeEntry =
  | {
      folder: Omit<FileTreeFolderProps, 'children'>
      items?: FileTreeEntry[]
      item?: never
    }
  | {
      item: FileTreeItemProps
      folder?: never
      items?: never
    }

export interface FileTreeProps extends Omit<FlexProps, 'children' | 'className' | 'style'> {
  classNames?: {
    root?: string
    folders?: FileTreeFolderProps['classNames']
    items?: FileTreeItemProps['classNames']
  }
  styles?: {
    root?: React.CSSProperties
    folders?: FileTreeFolderProps['styles']
    items?: FileTreeItemProps['styles']
  }
  items?: FileTreeEntry[]
}

export const FileTree = React.forwardRef<HTMLDivElement, FileTreeProps>(
  ({ classNames, styles, items = [], ...props }, ref) => {
    const { global } = useNSUI()

    const renderEntries = (entries: FileTreeEntry[]) =>
      entries.map((entry, index) => {
        if (entry.folder) {
          return (
            <FileTreeFolder
              key={index}
              {...entry.folder}
              classNames={{
                ...classNames?.folders,
                ...entry.folder.classNames
              }}
              styles={{
                ...styles?.folders,
                ...entry.folder.styles
              }}
            >
              {entry.items && renderEntries(entry.items)}
            </FileTreeFolder>
          )
        }

        return (
          <FileTreeItem
            key={index}
            {...entry.item}
            classNames={{
              ...classNames?.items,
              ...entry.item.classNames
            }}
            styles={{
              ...styles?.items,
              ...entry.item.styles
            }}
          />
        )
      })

    return (
      <Flex
        ref={ref}
        {...props}
        direction="column"
        className={cn(`${global?.prefixCls}-file-tree`, classNames?.root)}
        style={styles?.root}
      >
        {renderEntries(items)}
      </Flex>
    )
  }
)

FileTree.displayName = 'FileTree'
