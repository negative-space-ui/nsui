import { cn, Search, useNSUI } from '@negative-space/system'
import React from 'react'

export interface SearchBarSuggestionItemProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'className' | 'style'
> {
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  classNames?: {
    root?: string
    icon?: string
  }
  styles?: {
    root?: React.CSSProperties
    icon?: React.CSSProperties
  }
}

export const SearchBarSuggestionItem = React.forwardRef<HTMLElement, SearchBarSuggestionItemProps>(
  ({ classNames, styles, children, href, tabIndex = 0, ...props }, ref) => {
    const { global } = useNSUI()

    const Element = (href ? 'a' : 'div') as React.ElementType

    return (
      <Element
        ref={ref}
        href={href}
        tabIndex={tabIndex}
        className={cn(`${global.prefixCls}-search-bar-suggestion-item`, classNames?.root)}
        style={{
          display: 'flex',
          ...styles?.root
        }}
        {...props}
      >
        <Search
          className={cn(`${global.prefixCls}-search-bar-suggestion-item-icon`, classNames?.icon)}
          style={styles?.icon}
        />

        {children}
      </Element>
    )
  }
)

SearchBarSuggestionItem.displayName = 'SearchBarSuggestionItem'
