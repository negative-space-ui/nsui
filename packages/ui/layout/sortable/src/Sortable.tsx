import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, useNSUI } from '@negative-space/system'
import React, { forwardRef } from 'react'

import { SortableItemProps } from './SortableItem'
import { SortableProvider } from './SortableProvider'
import type { SortableDirection } from './useSortable'

export type classNames = {
  root?: string
  item?: SortableItemProps['classNames']
  handle?: string
}

export type styles = {
  root?: React.CSSProperties
  item?: SortableItemProps['styles']
  handle?: React.CSSProperties
}

export type SortableProps = Omit<FlexProps, 'className' | 'style'> & {
  classNames?: classNames
  styles?: styles
  direction?: SortableDirection
  onSort?: (order: string[]) => void
}

export const Sortable = forwardRef<HTMLDivElement, SortableProps>(
  ({ children, classNames, styles, direction = 'column', onSort, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <SortableProvider
        direction={direction}
        onSort={onSort}
        classNames={classNames}
        styles={styles}
      >
        <Flex
          {...props}
          ref={ref}
          direction={direction}
          className={cn(`${global.prefixCls}-sortable`, classNames?.root)}
          style={styles?.root}
        >
          {children}
        </Flex>
      </SortableProvider>
    )
  }
)

Sortable.displayName = 'Sortable'
