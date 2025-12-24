import React from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'
import { Flex } from '@negative-space/flex'

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'style'
> {
  classNames?: {
    label?: string
    checkbox?: string
  }
  styles?: {
    label?: React.CSSProperties
    checkbox?: React.CSSProperties
  }
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ classNames, styles, children, disabled, ...props }, ref) => {
    const { global } = useNSUI()
    return (
      <Flex
        as="label"
        alignItems="center"
        className={clsx(`${global.prefixCls}-checkbox-label`, classNames?.label)}
        style={styles?.label}
      >
        <input
          type="checkbox"
          ref={ref}
          disabled={disabled}
          data-disabled={disabled}
          className={clsx(`${global.prefixCls}-checkbox`, classNames?.checkbox)}
          style={styles?.checkbox}
          {...props}
        />
        {children}
      </Flex>
    )
  }
)

Checkbox.displayName = 'Checkbox'
