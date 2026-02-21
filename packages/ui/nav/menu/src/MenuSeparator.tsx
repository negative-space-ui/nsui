import React from 'react'
import { CollectionSeparator, type CollectionSeparatorProps } from '@negative-space/collection'

export type MenuSeparatorProps = CollectionSeparatorProps

export const MenuSeparator = (props: MenuSeparatorProps) => <CollectionSeparator {...props} />

MenuSeparator.displayName = 'MenuSeparator'
