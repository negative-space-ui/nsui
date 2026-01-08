import React from 'react'
import { Grid, type GridProps } from '@negative-space/grid'
import { CollectionContext } from './CollectionContext'
import { useCollectionController } from './useCollectionController'
import { CollectionItem, type CollectionItemProps } from './CollectionItem'
import { CollectionGroup, type CollectionGroupProps } from './CollectionGroup'
import { CollectionSeparator, type CollectionSeparatorProps } from './CollectionSeparator'

export type CollectionComponent =
  | { item: CollectionItemProps }
  | { group: CollectionGroupProps }
  | { separator: CollectionSeparatorProps }

export interface CollectionRootProps extends GridProps {
  children?: React.ReactNode
  components?: CollectionComponent[]
}

export const CollectionRoot = React.forwardRef<HTMLDivElement, CollectionRootProps>(
  ({ children, components, columns = '1', ...props }, ref) => {
    const controller = useCollectionController()

    return (
      <CollectionContext.Provider value={controller}>
        <Grid
          {...props}
          ref={ref}
          columns={columns}
          tabIndex={0}
          onKeyDown={controller.onKeyDown}
          onFocus={controller.onFocus}
          onBlur={controller.onBlur}
        >
          {children}

          {components?.map((component, index) => {
            const key = `collection-component-${index}`

            if ('item' in component) {
              return <CollectionItem key={key} {...component.item} />
            }

            if ('group' in component) {
              return <CollectionGroup key={key} {...component.group} />
            }

            if ('separator' in component) {
              return <CollectionSeparator key={key} {...component.separator} />
            }

            return null
          })}
        </Grid>
      </CollectionContext.Provider>
    )
  }
)

CollectionRoot.displayName = 'CollectionRoot'
