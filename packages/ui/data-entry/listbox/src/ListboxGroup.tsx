import React, { useId } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Text, TextProps } from '@negative-space/text'

export interface ListboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  labelProps?: TextProps
}

export const ListboxGroup = ({
  children,
  className,
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
      className={(cn(`${global.prefixCls}-listbox-group`), className)}
    >
      <Text {...labelProps} id={id} as="p">
        {label}
      </Text>
      {children}
    </div>
  )
}
