import React from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex, type FlexProps } from '@negative-space/flex'
import { ListItem, type ListItemProps } from './ListItem'

type ListElement = 'ol' | 'ul'

type ListDomMap = {
  ol: HTMLOListElement
  ul: HTMLUListElement
}

export type ListMarker = UnorderedMarker | OrderedMarker

type UnorderedMarker = 'disc' | 'circle' | 'square'
type OrderedMarker =
  | 'decimal'
  | 'decimal-leading-zero'
  | 'lower-alpha'
  | 'upper-alpha'
  | 'lower-roman'
  | 'upper-roman'

type MarkerByElement<E extends ListElement> = E extends 'ol' ? OrderedMarker : UnorderedMarker

export type ListProps<E extends ListElement = 'ol'> = {
  classNames?: {
    root?: string
    item?: string
  }
  styles?: {
    root?: React.CSSProperties
    item?: React.CSSProperties
  }
  as?: E
  items: Omit<ListItemProps, 'className' | 'style'>[]
  marker?: MarkerByElement<E>
} & Omit<FlexProps, 'as' | 'children' | 'className' | 'style'> &
  Omit<React.ComponentPropsWithoutRef<E>, 'className' | 'style'>

export const List = React.forwardRef(
  <E extends ListElement = 'ol'>(
    { classNames, styles, as, items, marker, direction = 'column', ...props }: ListProps<E>,
    ref: React.Ref<ListDomMap[E]>
  ) => {
    const { global, components } = useNSUI()
    const listElement = as ?? components.list.typeElement
    const Component = direction === 'row' ? 'ul' : listElement

    const Marker: ListMarker | 'none' =
      direction === 'row'
        ? 'none'
        : (marker ??
          (listElement === 'ol' ? components.list.olMarker : components.list.ulMarker) ??
          'none')

    return (
      <Flex
        {...props}
        ref={ref}
        as={Component}
        direction={direction}
        className={cn(`${global.prefixCls}-list`, classNames?.root)}
        style={{
          listStyleType: Marker,
          ...styles?.root
        }}
      >
        {items.map((item, index) => {
          const key = `item-${index}`
          return (
            <ListItem
              key={key}
              {...(classNames?.item && { classNames: classNames.item })}
              {...(styles?.item && { styles: styles.item })}
              {...item}
            />
          )
        })}
      </Flex>
    )
  }
)

List.displayName = 'List'
