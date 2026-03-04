import React from 'react'
import { cn, useNSUI, type ClickableAnimation } from '@negative-space/system'
import { Flex, FlexProps } from '@negative-space/flex'
import { Spinner, type SpinnerProps } from '@negative-space/spinner'
import { useRipple } from '@negative-space/ripple'
import { useButtonContextConditional } from './useButtonContext'

export interface ButtonProps extends Omit<
  FlexProps<'button'>,
  'as' | 'prefix' | 'className' | 'style'
> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  classNames?: {
    btn?: string
    prefix?: string
    content?: string
    suffix?: string
    spinner?: string
  }
  styles?: {
    btn?: React.CSSProperties
    prefix?: React.CSSProperties
    content?: React.CSSProperties
    suffix?: React.CSSProperties
    spinner?: React.CSSProperties
  }
  animation?: ClickableAnimation
  controlled?: boolean
  loading?: boolean
  spinnerPosition?: 'full' | 'prefix' | 'content' | 'suffix'
  spinnerProps?: Omit<SpinnerProps, 'loading' | 'className' | 'style'>
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      prefix,
      suffix,
      classNames,
      controlled,
      styles,
      disabled = false,
      animation,
      onClick,
      loading = false,
      spinnerPosition = 'full',
      spinnerProps,
      alignItems = 'center',
      justify = 'center',
      ...props
    },
    ref
  ) => {
    const { global, components } = useNSUI()
    const context = useButtonContextConditional(!!controlled)
    const groupDisabled = context.disabled

    const rippleDisabled = (animation ?? components.button.animation) !== 'ripple'
    const { createRipple } = useRipple(`${global.prefixCls}-ripple`)

    const isDisabled = disabled || loading || (controlled ? groupDisabled : false)
    const resolvedSpinner = (
      <Spinner loading className={classNames?.spinner} style={styles?.spinner} {...spinnerProps} />
    )

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (isDisabled) return
      const isKeyboard = e.detail === 0
      if (!rippleDisabled) createRipple(e, { centered: isKeyboard })

      onClick?.(e)
    }

    const showPrefix = prefix || (loading && spinnerPosition === 'prefix')
    const showContent = children || (loading && spinnerPosition === 'content')
    const showSuffix = suffix || (loading && spinnerPosition === 'suffix')

    return (
      <Flex
        {...props}
        ref={ref}
        as="button"
        alignItems={alignItems}
        justify={justify}
        disabled={isDisabled}
        data-loading={loading}
        data-disabled={isDisabled}
        onClick={handleClick}
        className={cn(`${global.prefixCls}-btn ${global.prefixCls}-clickable`, classNames?.btn)}
        style={styles?.btn}
      >
        {spinnerPosition === 'full' && loading ? (
          resolvedSpinner
        ) : (
          <>
            {showPrefix && (
              <span
                className={cn(`${global.prefixCls}-btn-prefix`, classNames?.prefix)}
                style={styles?.prefix}
              >
                {spinnerPosition === 'prefix' && loading ? resolvedSpinner : prefix}
              </span>
            )}

            {showContent && (
              <span
                className={cn(`${global.prefixCls}-btn-content`, classNames?.content)}
                style={styles?.content}
              >
                {spinnerPosition === 'content' && loading ? resolvedSpinner : children}
              </span>
            )}

            {showSuffix && (
              <span
                className={cn(`${global.prefixCls}-btn-suffix`, classNames?.suffix)}
                style={styles?.suffix}
              >
                {spinnerPosition === 'suffix' && loading ? resolvedSpinner : suffix}
              </span>
            )}
          </>
        )}
      </Flex>
    )
  }
)

Button.displayName = 'Button'
