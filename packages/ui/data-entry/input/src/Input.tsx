import React from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Field } from '@negative-space/field'
import { Flex } from '@negative-space/flex'

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'prefix' | 'style'
> {
  classNames?: {
    field?: {
      root?: string
      label?: string
      error?: string
    }
    root?: string
    prefix?: string
    content?: string
    suffix?: string
  }
  styles?: {
    field?: {
      root?: React.CSSProperties
      label?: React.CSSProperties
      error?: React.CSSProperties
    }
    root?: React.CSSProperties
    prefix?: React.CSSProperties
    content?: React.CSSProperties
    suffix?: React.CSSProperties
  }
  label?: string
  error?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  htmlFor?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ classNames, styles, label, error, prefix, suffix, htmlFor, id, ...props }, ref) => {
    const { global } = useNSUI()
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    return (
      <Field
        classNames={classNames?.field}
        styles={styles?.field}
        label={label}
        error={error}
        htmlFor={htmlFor ?? inputId}
      >
        <Flex
          alignItems="center"
          className={cn(`${global.prefixCls}-input-root`, classNames?.root)}
          style={{ marginTop: '6px', ...styles?.root }}
        >
          {prefix && (
            <span
              className={cn(`${global.prefixCls}-input-prefix`, classNames?.prefix)}
              style={styles?.prefix}
            >
              {prefix}
            </span>
          )}

          <input
            {...props}
            ref={ref}
            id={inputId}
            className={cn(`${global.prefixCls}-input-content`, classNames?.content)}
            style={{ outline: 'none', ...styles?.content }}
          />

          {suffix && (
            <span
              className={cn(`${global.prefixCls}-input-suffix`, classNames?.suffix)}
              style={styles?.suffix}
            >
              {suffix}
            </span>
          )}
        </Flex>
      </Field>
    )
  }
)

Input.displayName = 'Input'
