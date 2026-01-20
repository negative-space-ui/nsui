import React, { forwardRef, ReactNode } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex } from '@negative-space/flex'

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
    const directionFinal = direction ?? components.list.direction
    const listElement = as ?? components.list.typeElement
    const Component = directionFinal === 'horizontal' ? 'ul' : listElement

    const Marker =
      directionFinal === 'horizontal'
        ? 'none'
        : (marker ?? (listElement === 'ol' ? components.list.olMarker : components.list.ulMarker))

    return (
      <Flex
        {...props}
        ref={ref}
        as={Component}
        direction={directionFinal === 'horizontal' ? 'row' : 'column'}
        className={cn(
          `${global.prefixCls}-list
          ${directionFinal !== 'horizontal' ? `${global.prefixCls}-marker-${Marker}` : ''}`,
          className
        )}
      >
        {children}
      </Flex>
    )
  }
)

List.displayName = 'List'
