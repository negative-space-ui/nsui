import { Field } from '@negative-space/field'
import { Flex } from '@negative-space/flex'
import { Spinner, type SpinnerProps } from '@negative-space/spinner'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

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
    spinner?: string
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
    spinner?: React.CSSProperties
  }
  label?: string
  error?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  htmlFor?: string
  loading?: boolean
  spinnerPosition?: 'prefix' | 'suffix'
  spinnerProps?: Omit<SpinnerProps, 'loading' | 'className' | 'style'>
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      classNames,
      styles,
      label,
      error,
      prefix,
      suffix,
      htmlFor,
      id,
      loading = false,
      spinnerPosition = 'suffix',
      spinnerProps,
      disabled,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    const resolvedSpinner = (
      <Spinner loading className={classNames?.spinner} style={styles?.spinner} {...spinnerProps} />
    )

    const showPrefix = prefix || (loading && spinnerPosition === 'prefix')
    const showSuffix = suffix || (loading && spinnerPosition === 'suffix')

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
          {showPrefix && (
            <span
              className={cn(`${global.prefixCls}-input-prefix`, classNames?.prefix)}
              style={{ display: 'flex', alignItems: 'center', ...styles?.prefix }}
            >
              {loading && spinnerPosition === 'prefix' ? resolvedSpinner : prefix}
            </span>
          )}

          <input
            {...props}
            ref={ref}
            id={inputId}
            disabled={disabled || loading}
            data-loading={loading}
            className={cn(`${global.prefixCls}-input-content`, classNames?.content)}
            style={{ outline: 'none', flex: 1, minWidth: 0, ...styles?.content }}
          />

          {showSuffix && (
            <span
              className={cn(`${global.prefixCls}-input-suffix`, classNames?.suffix)}
              style={{ display: 'flex', alignItems: 'center', ...styles?.suffix }}
            >
              {loading && spinnerPosition === 'suffix' ? resolvedSpinner : suffix}
            </span>
          )}
        </Flex>
      </Field>
    )
  }
)

Input.displayName = 'Input'
