import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, useNSUI } from '@negative-space/system'
import { Text } from '@negative-space/text'
import React from 'react'

export interface FieldProps extends Omit<FlexProps<'fieldset'>, 'as' | 'className' | 'style'> {
  classNames?: {
    root?: string
    label?: string
    error?: string
  }
  styles?: {
    root?: React.CSSProperties
    label?: React.CSSProperties
    error?: React.CSSProperties
  }
  label?: React.ReactNode
  error?: React.ReactNode
  htmlFor?: string
}

export const Field = ({
  direction = 'column',
  alignItems = 'start',
  gap = '2px',
  label,
  error,
  children,
  classNames,
  styles,
  htmlFor,
  ...props
}: FieldProps) => {
  const { global } = useNSUI()

  return (
    <Flex
      as="fieldset"
      direction={direction}
      gap={gap}
      alignItems={alignItems}
      className={cn(`${global.prefixCls}-field`, classNames?.root)}
      style={styles?.root}
      data-error={!!error}
      {...props}
    >
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn(`${global.prefixCls}-field-label`, classNames?.label)}
          style={{ cursor: 'pointer', ...styles?.label }}
        >
          {label}
        </label>
      )}

      {children}

      {error && (
        <Text
          className={cn(`${global.prefixCls}-text-error`, classNames?.error)}
          style={{ color: global.colors.error, ...styles?.error }}
        >
          {error}
        </Text>
      )}
    </Flex>
  )
}
