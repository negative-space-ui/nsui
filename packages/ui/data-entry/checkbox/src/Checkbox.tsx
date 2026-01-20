import React, { useState } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex } from '@negative-space/flex'
import { Checkmark, type CheckmarkProps } from '@negative-space/checkmark'

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className' | 'style'
> {
  classNames?: {
    label?: string
    checkbox?: string
    checkboxInner?: string
  }
  styles?: {
    label?: React.CSSProperties
    checkbox?: React.CSSProperties
    checkboxInner?: React.CSSProperties
  }
  isPopDisabled?: boolean
  checkmarkProps?: CheckmarkProps
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      classNames,
      styles,
      children,
      checked,
      defaultChecked = false,
      disabled,
      isPopDisabled,
      checkmarkProps,
      ...props
    },
    ref
  ) => {
    const { global, components } = useNSUI()
    const [internalChecked, setInternalChecked] = useState(defaultChecked)
    const isChecked = checked !== undefined ? checked : internalChecked
    const IsPopDisabled = isPopDisabled ?? components.checkbox.isPopDisabled

    const toggleChecked = () => {
      if (disabled) return
      if (checked === undefined) {
        setInternalChecked(!internalChecked)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleChecked()
      }
    }

    return (
      <Flex
        {...props}
        ref={ref}
        as="label"
        alignItems="center"
        className={cn(`${global.prefixCls}-checkbox-label`, classNames?.label)}
        style={styles?.label}
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={disabled}
        data-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={toggleChecked}
        onKeyDown={handleKeyDown}
      >
        <span
          aria-hidden="true"
          data-checked={isChecked}
          data-disabled={disabled}
          className={cn(`${global.prefixCls}-checkbox`, classNames?.checkbox)}
          style={styles?.checkbox}
        >
          <span
            data-checked={isChecked}
            className={cn(
              `${global.prefixCls}-checkbox-inner`,
              isChecked && !IsPopDisabled && `${global.prefixCls}-pop`,
              classNames?.checkboxInner
            )}
            style={styles?.checkboxInner}
          />
          <Checkmark {...checkmarkProps} checked={isChecked} />
        </span>

        {children}
      </Flex>
    )
  }
)

Checkbox.displayName = 'Checkbox'
