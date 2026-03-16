import { CollectionSeparator, type CollectionSeparatorProps } from '@negative-space/collection'
import React from 'react'

export type MenuSeparatorProps = CollectionSeparatorProps

export const MenuSeparator = (props: MenuSeparatorProps) => <CollectionSeparator {...props} />

MenuSeparator.displayName = 'MenuSeparator'
