import React from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex } from '@negative-space/flex'
import { Spinner, type SpinnerProps } from '@negative-space/spinner'
import { useRipple } from '@negative-space/ripple'

export interface BaseButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'prefix' | 'className' | 'style'
> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  classNames?: {
    btn?: string
    content?: string
    prefix?: string
    suffix?: string
  }
  styles?: {
    btn?: React.CSSProperties
    content?: React.CSSProperties
    prefix?: React.CSSProperties
    suffix?: React.CSSProperties
  }
  isRippleDisabled?: boolean
  isLoading?: boolean
  spinner?: React.ReactNode
  spinnerPosition?: 'full' | 'prefix' | 'content' | 'suffix'
  spinnerProps?: SpinnerProps
}

export type ButtonProps = BaseButtonProps

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      prefix,
      suffix,
      classNames,
      styles,
      disabled = false,
      isRippleDisabled,
      onClick,
      isLoading = false,
      spinner,
      spinnerPosition = 'full',
      spinnerProps,
      ...props
    },
    ref
  ) => {
    const { global, components } = useNSUI()
    const rippleDisabled = isRippleDisabled ?? components.button.isRippleDisabled

    const { createRipple } = useRipple(`${global.prefixCls}-ripple`)
    const isDisabled = disabled || isLoading

    const resolvedSpinner = spinner ?? <Spinner {...spinnerProps} />

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (isDisabled) return
      const isKeyboard = e.detail === 0
      if (!rippleDisabled) createRipple(e, { centered: isKeyboard })

      onClick?.(e)
    }

    const showPrefix = prefix || (isLoading && spinnerPosition === 'prefix')
    const showContent = children || (isLoading && spinnerPosition === 'content')
    const showSuffix = suffix || (isLoading && spinnerPosition === 'suffix')

    return (
      <Flex
        {...props}
        ref={ref}
        as="button"
        alignItems="center"
        justify="center"
        disabled={isDisabled}
        data-disabled={isDisabled}
        onClick={handleClick}
        className={cn(`${global.prefixCls}-btn`, classNames?.btn)}
        style={styles?.btn}
      >
        {spinnerPosition === 'full' && isLoading ? (
          resolvedSpinner
        ) : (
          <>
            {showPrefix && (
              <span
                className={cn(`${global.prefixCls}-btn-prefix`, classNames?.prefix)}
                style={styles?.prefix}
              >
                {spinnerPosition === 'prefix' && isLoading ? resolvedSpinner : prefix}
              </span>
            )}

            {showContent && (
              <span
                className={cn(`${global.prefixCls}-btn-content`, classNames?.content)}
                style={styles?.content}
              >
                {spinnerPosition === 'content' && isLoading ? resolvedSpinner : children}
              </span>
            )}

            {showSuffix && (
              <span
                className={cn(`${global.prefixCls}-btn-suffix`, classNames?.suffix)}
                style={styles?.suffix}
              >
                {spinnerPosition === 'suffix' && isLoading ? resolvedSpinner : suffix}
              </span>
            )}
          </>
        )}
      </Flex>
    )
  }
)

Button.displayName = 'Button'
