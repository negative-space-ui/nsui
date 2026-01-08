import { CollectionRoot, type CollectionRootProps } from './CollectionRoot'
import { CollectionGroup, type CollectionGroupProps } from './CollectionGroup'
import { CollectionItem, type CollectionItemProps } from './CollectionItem'
import { CollectionSeparator, type CollectionSeparatorProps } from './CollectionSeparator'

export const Collection = Object.assign(CollectionRoot, {
  Item: CollectionItem,
  Group: CollectionGroup,
  Separator: CollectionSeparator
})

export type {
  CollectionRootProps as CollectionProps,
  CollectionGroupProps,
  CollectionItemProps,
  CollectionSeparatorProps
}
