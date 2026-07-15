import { Flex, FlexProps } from '@negative-space/flex'
import { useRipple } from '@negative-space/ripple'
import { Spinner, type SpinnerProps } from '@negative-space/spinner'
import { type ClickableAnimation, cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { useButtonContextConditional } from './useButtonContext'

type ButtonAccessibility =
  | {
      children: React.ReactNode
      ariaLabel?: string | false
    }
  | {
      children?: never
      ariaLabel: string
    }

interface ButtonBaseProps extends Omit<
  FlexProps<'button'>,
  'as' | 'prefix' | 'className' | 'style' | 'aria-label'
> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode

  classNames?: {
    root?: string
    prefix?: string
    content?: string
    suffix?: string
    spinner?: string
  }

  styles?: {
    root?: React.CSSProperties
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

export type ButtonProps = ButtonBaseProps & ButtonAccessibility

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      classNames,
      styles,
      prefix,
      suffix,
      controlled,
      disabled = false,
      animation,
      loading = false,
      spinnerPosition = 'full',
      spinnerProps,
      justifyContent = 'center',
      type,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const { global, components } = useNSUI()
    const context = useButtonContextConditional(!!controlled)
    const groupDisabled = context.disabled

    const Type = type ?? components.button.type
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

    const resolvedAriaLabel =
      ariaLabel === false
        ? undefined
        : (ariaLabel ?? (typeof children === 'string' ? children : undefined))

    return (
      <Flex
        {...props}
        ref={ref}
        as="button"
        type={Type}
        justifyContent={justifyContent}
        disabled={isDisabled}
        data-loading={loading}
        data-disabled={isDisabled}
        aria-label={resolvedAriaLabel}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        className={cn(`${global.prefixCls}-button`, classNames?.root)}
        style={styles?.root}
      >
        {spinnerPosition === 'full' && loading ? (
          resolvedSpinner
        ) : (
          <>
            {showPrefix && (
              <span
                className={cn(`${global.prefixCls}-button-prefix`, classNames?.prefix)}
                style={styles?.prefix}
              >
                {spinnerPosition === 'prefix' && loading ? resolvedSpinner : prefix}
              </span>
            )}

            {showContent && (
              <span
                className={cn(`${global.prefixCls}-button-content`, classNames?.content)}
                style={styles?.content}
              >
                {spinnerPosition === 'content' && loading ? resolvedSpinner : children}
              </span>
            )}

            {showSuffix && (
              <span
                className={cn(`${global.prefixCls}-button-suffix`, classNames?.suffix)}
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
