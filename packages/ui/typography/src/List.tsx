import React, { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'

type ListElement = 'ol' | 'ul'

type ListDomMap = {
  ol: HTMLOListElement
  ul: HTMLUListElement
}

type UnorderedMarker = 'disc' | 'circle' | 'square'
type OrderedMarker =
  | 'decimal'
  | 'decimal-leading-zero'
  | 'lower-alpha'
  | 'upper-alpha'
  | 'lower-roman'
  | 'upper-roman'

type MarkerByElement<E extends ListElement> = E extends 'ol' ? OrderedMarker : UnorderedMarker
type Direction = 'vertical' | 'horizontal'

export type ListProps<E extends ListElement = 'ol'> = {
  as?: E
  children: ReactNode
  marker?: MarkerByElement<E>
  direction?: Direction
} & React.ComponentPropsWithoutRef<E>

export const List = forwardRef(
  <E extends ListElement = 'ol'>(
    { as, children, className, marker, direction, ...props }: ListProps<E>,
    ref: React.Ref<ListDomMap[E]>
  ) => {
    const { global, components } = useNSUI()
    const dir = direction || components.list.direction
    const Component = (dir === 'horizontal' ? 'ol' : (as ?? 'ol')) as React.ElementType

    const defaultMarker =
      dir === 'horizontal'
        ? 'none'
        : as === 'ol'
          ? (components.list.olMarker ?? 'decimal')
          : (components.list.ulMarker ?? 'disc')

    const Marker = dir === 'horizontal' ? 'none' : (marker ?? defaultMarker)

    return (
      <Component
        {...props}
        ref={ref}
        className={clsx(
          `${global.prefixCls}-list ${global.prefixCls}-list-${dir} ${
            dir !== 'horizontal' ? `${global.prefixCls}-marker-${Marker}` : ''
          }`,
          className
        )}
      >
        {children}
      </Component>
    )
  }
)

List.displayName = 'List'
