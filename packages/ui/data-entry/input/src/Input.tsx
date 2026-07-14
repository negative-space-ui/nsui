import { Field, FieldProps } from '@negative-space/field'
import { Flex, type FlexProps } from '@negative-space/flex'
import { Spinner, type SpinnerProps } from '@negative-space/spinner'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'prefix' | 'style'
> {
  mask?: (value: string) => string
  classNames?: {
    field?: FieldProps['classNames']
    root?: string
    prefix?: string
    content?: string
    suffix?: string
    spinner?: string
  }
  styles?: {
    field?: FieldProps['styles']
    root?: React.CSSProperties
    prefix?: React.CSSProperties
    content?: React.CSSProperties
    suffix?: React.CSSProperties
    spinner?: React.CSSProperties
  }
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  loading?: boolean
  spinnerPosition?: 'prefix' | 'suffix'
  flexProps?: Omit<FlexProps, 'className' | 'style'>
  fieldProps?: Omit<FieldProps, 'htmlFor' | 'classNames' | 'styles'>
  spinnerProps?: Omit<SpinnerProps, 'loading' | 'className' | 'style'>
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      classNames,
      styles,
      prefix,
      suffix,
      loading = false,
      spinnerPosition = 'suffix',
      disabled,
      mask,
      onChange,
      onPaste,
      flexProps,
      fieldProps,
      spinnerProps,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()

    const Id = id ?? name

    const resolvedSpinner = (
      <Spinner loading className={classNames?.spinner} style={styles?.spinner} {...spinnerProps} />
    )

    const showPrefix = prefix || (loading && spinnerPosition === 'prefix')
    const showSuffix = suffix || (loading && spinnerPosition === 'suffix')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (mask) {
        e.target.value = mask(e.target.value)
      }
      onChange?.(e)
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (!mask) {
        onPaste?.(e)
        return
      }

      e.preventDefault()

      const pasted = e.clipboardData.getData('text')
      const input = e.currentTarget
      const start = input.selectionStart ?? input.value.length
      const end = input.selectionEnd ?? input.value.length

      const newValue = mask(input.value.slice(0, start) + pasted + input.value.slice(end))

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set

      nativeInputValueSetter?.call(input, newValue)
      const syntheticEvent = new Event('input', { bubbles: true })

      input.dispatchEvent(syntheticEvent)

      onPaste?.(e)
    }

    return (
      <Field
        {...fieldProps}
        labelProps={{ htmlFor: Id, ...fieldProps?.labelProps }}
        classNames={classNames?.field}
        styles={styles?.field}
      >
        <Flex
          {...flexProps}
          alignItems="center"
          className={cn(`${global.prefixCls}-input-root`, classNames?.root)}
          style={styles?.root}
        >
          {showPrefix && (
            <span
              className={cn(`${global.prefixCls}-input-prefix`, classNames?.prefix)}
              style={styles?.prefix}
            >
              {loading && spinnerPosition === 'prefix' ? resolvedSpinner : prefix}
            </span>
          )}

          <input
            {...props}
            ref={ref}
            id={Id}
            name={name}
            disabled={disabled || loading}
            data-loading={loading}
            onChange={handleChange}
            onPaste={handlePaste}
            className={cn(`${global.prefixCls}-input-content`, classNames?.content)}
            style={{ outline: 'none', ...styles?.content }}
          />

          {showSuffix && (
            <span
              className={cn(`${global.prefixCls}-input-suffix`, classNames?.suffix)}
              style={styles?.suffix}
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
