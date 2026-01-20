import React, { useId } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Text, TextProps } from '@negative-space/text'

export interface CollectionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  labelProps?: TextProps
}

export const CollectionGroup = ({
  children,
  className,
  label,
  labelProps,
  ...props
}: CollectionGroupProps) => {
  const { global } = useNSUI()
  const id = useId()

  return (
    <div
      {...props}
      role="group"
      aria-labelledby={id}
      className={(cn(`${global.prefixCls}-group`), className)}
    >
      <Text {...labelProps} id={id} as="p" className={cn(`${global.prefixCls}-group-label`)}>
        {label}
      </Text>
      {children}
    </div>
  )
}
