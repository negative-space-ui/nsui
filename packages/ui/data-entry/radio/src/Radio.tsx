import React from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex, type FlexProps } from '@negative-space/flex'
import { useRadioContext } from './useRadioContext'

export interface RadioProps extends Omit<FlexProps<'label'>, 'className' | 'style'> {
  disabled?: boolean
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
  (
    {
      classNames,
      alignItems = 'center',
      styles,
      value,
      children,
      disabled,
      isPopDisabled,
      ...props
    },
    ref
  ) => {
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
        {...props}
        as="label"
        alignItems={alignItems}
        aria-disabled={Disabled}
        data-disabled={Disabled}
        onClick={handleClick}
        className={cn(
          `${global.prefixCls}-radio-label ${global.prefixCls}-clickable`,
          classNames?.label
        )}
        style={styles?.label}
      >
        <div
          ref={ref}
          role="radio"
          aria-checked={checked}
          data-checked={checked}
          tabIndex={Disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          data-disabled={Disabled}
          className={cn(`${global.prefixCls}-radio`, classNames?.radio)}
          style={{
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            ...styles?.radio
          }}
        >
          <div
            data-visible={checked}
            className={cn(
              `${global.prefixCls}-radio-inner ${global.prefixCls}-fade`,
              checked && !IsPopDisabled && `${global.prefixCls}-pop`,
              classNames?.inner
            )}
            style={{
              borderRadius: '50%',
              ...styles?.inner
            }}
          />
        </div>
        {children}
      </Flex>
    )
  }
)

Radio.displayName = 'Radio'
