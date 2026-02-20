import React from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex, type FlexProps } from '@negative-space/flex'
import { Text } from '@negative-space/text'

export interface FieldProps extends Omit<FlexProps<'fieldset'>, 'as' | 'className' | 'style'> {
  classNames?: {
    field?: string
    label?: string
    error?: string
  }
  styles?: {
    field?: React.CSSProperties
    label?: React.CSSProperties
    error?: React.CSSProperties
  }
  label?: string
  labelProps?: Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children' | 'className' | 'style'>
  error?: string
}

export const Field = ({
  direction = 'column',
  label,
  error,
  children,
  classNames,
  styles,
  ...props
}: FieldProps) => {
  const { global } = useNSUI()

  return (
    <Flex
      as="fieldset"
      direction={direction}
      className={cn(`${global.prefixCls}-field`, classNames?.field)}
      style={styles?.field}
      {...props}
    >
      {label && (
        <label
          className={cn(`${global.prefixCls}-field-label`, classNames?.label)}
          style={styles?.label}
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
