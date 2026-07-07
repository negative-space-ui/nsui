import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, useNSUI } from '@negative-space/system'
import { Text, type TextProps } from '@negative-space/text'
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
  labelProps?: Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children' | 'className' | 'style'>
  error?: React.ReactNode
  errorProps?: Omit<TextProps, 'as' | 'children' | 'className' | 'style'>
}

export const Field = ({
  children,
  classNames,
  styles,
  direction = 'column',
  alignItems = 'start',
  label,
  labelProps,
  error,
  errorProps,
  ...props
}: FieldProps) => {
  const { global } = useNSUI()

  return (
    <Flex
      {...props}
      as="fieldset"
      direction={direction}
      alignItems={alignItems}
      className={cn(`${global.prefixCls}-field`, classNames?.root)}
      style={styles?.root}
      data-error={!!error}
    >
      {label && (
        <Text
          {...labelProps}
          as="label"
          className={cn(`${global.prefixCls}-label`, classNames?.label)}
          style={styles?.label}
        >
          {label}
        </Text>
      )}

      {children}

      {error && (
        <Text
          {...errorProps}
          as="p"
          className={cn(`${global.prefixCls}-text-error`, classNames?.error)}
          style={{ color: `var(--${global.prefixCls}-error)`, ...styles?.error }}
        >
          {error}
        </Text>
      )}
    </Flex>
  )
}
