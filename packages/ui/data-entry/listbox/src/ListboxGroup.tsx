import React, { useId } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Text, TextProps } from '@negative-space/text'

export interface ListboxGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'className' | 'style'
> {
  classNames?: {
    root?: string
    label?: string
  }
  styles?: {
    root?: React.CSSProperties
    label?: React.CSSProperties
  }
  label: string
  labelProps?: TextProps
}

export const ListboxGroup = ({
  children,
  classNames,
  styles,
  label,
  labelProps,
  ...props
}: ListboxGroupProps) => {
  const { global } = useNSUI()
  const id = useId()

  return (
    <div
      {...props}
      role="group"
      aria-labelledby={id}
      className={(cn(`${global.prefixCls}-listbox-group`), classNames?.root)}
      style={styles?.root}
    >
      <Text
        {...labelProps}
        id={id}
        as="p"
        className={cn(`${global.prefixCls}-listbox-group-label`, classNames?.label)}
        style={styles?.label}
      >
        {label}
      </Text>
      {children}
    </div>
  )
}
