import React from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex } from '@negative-space/flex'
import { useRadioContext } from './useRadioContext'

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'name' | 'checked' | 'onChange' | 'className' | 'style'
> {
  value: string | number
  classNames?: {
    label?: string
    radio?: string
    inner?: string
  }
  styles?: {
    label?: React.CSSProperties
    radio?: React.CSSProperties
    inner?: React.CSSProperties
  }
  isPopDisabled?: boolean
}

export const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  ({ classNames, styles, value, children, disabled, isPopDisabled, ...props }, ref) => {
    const { global, components } = useNSUI()
    const { selectedValue, onChange, disabled: groupDisabled } = useRadioContext()
    const Disabled = disabled ?? groupDisabled
    const checked = selectedValue === value
    const IsPopDisabled = isPopDisabled ?? components.radio.isPopDisabled

    const handleClick = () => {
      if (!Disabled) onChange?.(value)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (Disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onChange?.(value)
      }
    }

    return (
      <Flex
        as="label"
        alignItems="center"
        justify="start"
        disabled={Disabled}
        data-disabled={Disabled}
        onClick={handleClick}
        className={cn(`${global.prefixCls}-radio-label`, classNames?.label)}
        style={styles?.label}
      >
        <div
          {...props}
          ref={ref}
          role="radio"
          aria-checked={checked}
          data-checked={checked}
          tabIndex={Disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          data-disabled={Disabled}
          className={cn(`${global.prefixCls}-radio`, classNames?.radio)}
          style={{ ...styles?.radio }}
        >
          <div
            className={cn(
              `${global.prefixCls}-radio-inner`,
              checked && !IsPopDisabled && `${global.prefixCls}-pop`,
              classNames?.inner
            )}
            style={{ ...styles?.inner }}
          />
        </div>
        {children}
      </Flex>
    )
  }
)

Radio.displayName = 'Radio'
