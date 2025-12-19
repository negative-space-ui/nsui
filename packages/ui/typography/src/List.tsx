import React, { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'

type ListElement = 'ol' | 'ul'

type ListDomMap = {
  ol: HTMLOListElement
  ul: HTMLUListElement
}

export type ListProps<E extends ListElement = 'ol'> = {
  as?: E
  children: ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<E>

export const List = forwardRef(
  <E extends ListElement = 'ol'>(
    { as, children, className, ...props }: ListProps<E>,
    ref: React.Ref<ListDomMap[E]>
  ) => {
    const Component = (as ?? 'ol') as React.ElementType
    const { global } = useNSUI()

    return (
      <Component {...props} ref={ref} className={clsx(`${global.prefixCls}-list`, className)}>
        {children}
      </Component>
    )
  }
)

List.displayName = 'List'
