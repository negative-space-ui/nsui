import { Checkmark, type CheckmarkProps } from '@negative-space/checkmark'
import { Field } from '@negative-space/field'
import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, useNSUI } from '@negative-space/system'
import React, { useState } from 'react'

export interface CheckboxProps extends Omit<
  FlexProps<'label'>,
  'as' | 'type' | 'className' | 'style'
> {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  classNames?: {
    field?: {
      root?: string
      error?: string
    }
    label?: string
    checkbox?: string
    checkboxInner?: string
    checkmark?: string
  }
  styles?: {
    field?: {
      root?: React.CSSProperties
      error?: React.CSSProperties
    }
    label?: React.CSSProperties
    checkbox?: React.CSSProperties
    checkboxInner?: React.CSSProperties
    checkmark?: React.CSSProperties
  }
  error?: React.ReactNode
  checkmarkProps?: Omit<CheckmarkProps, 'checked' | 'className' | 'style'>
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
      checkmarkProps,
      alignItems = 'center',
      justify = 'center',
      error,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()
    const [internalChecked, setInternalChecked] = useState(defaultChecked)
    const isChecked = checked !== undefined ? checked : internalChecked

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
      <Field classNames={classNames?.field} styles={styles?.field} error={error}>
        <Flex
          {...props}
          ref={ref}
          as="label"
          alignItems={alignItems}
          justify={justify}
          className={cn(
            `${global.prefixCls}-checkbox-label ${global.prefixCls}-clickable`,
            classNames?.label
          )}
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
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...styles?.checkbox
            }}
          >
            <span
              data-checked={isChecked}
              className={cn(`${global.prefixCls}-checkbox-inner`, classNames?.checkboxInner)}
              style={{
                position: 'absolute',
                inset: 0,
                ...styles?.checkboxInner
              }}
            />

            <Checkmark
              {...checkmarkProps}
              checked={isChecked}
              className={classNames?.checkmark}
              style={{
                display: 'block',
                transformOrigin: 'center',
                ...styles?.checkmark
              }}
            />
          </span>

          {children}
        </Flex>
      </Field>
    )
  }
)

Checkbox.displayName = 'Checkbox'
