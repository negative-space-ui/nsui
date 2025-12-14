import React from 'react'
import { clsx } from 'clsx'
import { useNSUI } from '@negative-space/provider'
import { useRipple } from '@negative-space/ripple'
import { Spinner, type SpinnerProps } from '@negative-space/spinner'
import '@negative-space/ripple/ripple.css'

export interface BaseButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'prefix' | 'className' | 'style'
> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  classNames?: { btn?: string; content?: string; prefix?: string; suffix?: string }
  styles?: {
    btn?: React.CSSProperties
    content?: React.CSSProperties
    prefix?: React.CSSProperties
    suffix?: React.CSSProperties
  }
  isRippleDisabled?: boolean
  isLoading?: boolean
  spinnerPosition?: 'full' | 'prefix' | 'content' | 'suffix'
  spinner?: React.ReactNode
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
      disabled = false, // explicitly default value for autodocs
      isRippleDisabled,
      onClick,
      isLoading = false,
      spinner,
      spinnerProps,
      spinnerPosition = 'full',
      ...props
    },
    ref
  ) => {
    const { global, components } = useNSUI()
    const isRippleDisabledFinal = isRippleDisabled ?? components?.button?.isRippleDisabled
    const { createRipple } = useRipple()
    const isDisabled = disabled || isLoading

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (!isRippleDisabledFinal && !isDisabled) createRipple(e)
      onClick?.(e)
    }

    const finalSpinnerProps = !spinner ? (spinnerProps ?? {}) : {}
    const renderSpinner = () => spinner ?? <Spinner {...finalSpinnerProps} />

    const sections = [
      {
        node: prefix,
        showSpinner: spinnerPosition === 'prefix',
        className: classNames?.prefix,
        style: styles?.prefix,
        justify: 'flex-start'
      },
      {
        node: children,
        showSpinner: spinnerPosition === 'content',
        className: classNames?.content,
        style: styles?.content,
        justify: 'center'
      },
      {
        node: suffix,
        showSpinner: spinnerPosition === 'suffix',
        className: classNames?.suffix,
        style: styles?.suffix,
        justify: 'flex-end'
      }
    ]

    const visibleCount = sections.filter((s) => s.node || (isLoading && s.showSpinner)).length
    const sectionMaxWidth = `calc((100% - 1rem) / ${visibleCount})`

    const baseSpanStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      overflow: 'hidden',
      flex: '1 1 0'
    }

    return (
      <button
        {...props}
        ref={ref}
        disabled={isDisabled}
        role="button"
        aria-disabled={isDisabled}
        className={clsx(`${global.prefixCls}-btn`, classNames?.btn)}
        onClick={handleClick}
        style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '0.5rem',
          gap: '0.5rem',
          transition: `background-color ${global.colorTransitionDuration}ms ease-in-out, color ${global.colorTransitionDuration}ms ease-in-out, scale ${global.scaleTransitionDuration}ms ease-in-out`,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          ...styles?.btn
        }}
      >
        {isLoading && spinnerPosition === 'full' ? (
          <span
            className={clsx(`${global.prefixCls}-btn-content`, classNames?.content)}
            style={{ ...baseSpanStyle, justifyContent: 'center', flex: 1, ...styles?.content }}
          >
            {renderSpinner()}
          </span>
        ) : (
          sections.map((s, idx) =>
            s.node || (isLoading && s.showSpinner) ? (
              <span
                key={idx}
                className={clsx(
                  idx === 0
                    ? `${global.prefixCls}-btn-left`
                    : idx === 1
                      ? `${global.prefixCls}-btn-content`
                      : `${global.prefixCls}-btn-right`,
                  s.className
                )}
                style={{
                  ...baseSpanStyle,
                  justifyContent: s.justify,
                  maxWidth: sectionMaxWidth,
                  ...s.style
                }}
              >
                {isLoading && s.showSpinner ? renderSpinner() : s.node}
              </span>
            ) : (
              <span key={idx} style={{ flex: '1 1 0' }} />
            )
          )
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
