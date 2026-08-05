import { Flex, type FlexProps } from '@negative-space/flex'
import { Popover, type PopoverProps } from '@negative-space/popover'
import { type UseRovingFocusOptions } from '@negative-space/roving-focus'
import React from 'react'

import { Collection } from './Collection'
import { useCollectionSubmenu, type UseCollectionSubmenuOptions } from './useCollectionSubmenu'

export interface CollectionSubmenuProps
  extends
    Omit<FlexProps<'li'>, 'as' | 'onClick' | 'onSelect' | 'ref' | 'value' | 'className' | 'style'>,
    UseCollectionSubmenuOptions {
  classNames?: {
    heading?: string
    popover?: PopoverProps['classNames']
  }
  styles?: {
    heading?: React.CSSProperties
    popover?: PopoverProps['styles']
  }
  heading: React.ReactNode
  children: React.ReactNode
  rovingOptions?: UseRovingFocusOptions
}

export function CollectionSubmenu({
  children,
  classNames,
  styles,
  heading,
  value,
  disabled = false,
  role = 'menuitem',
  popoverOptions,
  rovingOptions,
  ...props
}: CollectionSubmenuProps) {
  const { setItemRef, contentRef, popover, triggerProps, contentProps } = useCollectionSubmenu({
    value,
    disabled,
    popoverOptions
  })

  return (
    <>
      <Flex
        {...props}
        {...popover.getReferenceProps()}
        {...triggerProps}
        ref={setItemRef}
        as="li"
        role={role}
        className={classNames?.heading}
        style={styles?.heading}
      >
        {heading}
      </Flex>

      <Popover popover={popover} classNames={classNames?.popover} styles={styles?.popover}>
        <div ref={contentRef} {...contentProps}>
          <Collection role="menu" rovingOptions={rovingOptions}>
            {children}
          </Collection>
        </div>
      </Popover>
    </>
  )
}

CollectionSubmenu.displayName = 'CollectionSubmenu'
