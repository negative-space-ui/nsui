import { Checkmark, type CheckmarkProps } from '@negative-space/checkmark'
import { Field, type FieldProps } from '@negative-space/field'
import { cn, useNSUI } from '@negative-space/system'
import React, { useState } from 'react'

export interface CheckboxProps extends Omit<
  FieldProps,
  'as' | 'type' | 'classNames' | 'styles' | 'onChange'
> {
  classNames?: {
    field?: FieldProps['classNames']
    checkbox?: string
    checkboxInner?: string
    checkmark?: string
  }
  styles?: {
    field?: FieldProps['styles']
    checkbox?: React.CSSProperties
    checkboxInner?: React.CSSProperties
    checkmark?: React.CSSProperties
  }
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  fieldProps?: Omit<FieldProps, 'classNames' | 'styles'>
  checkmarkProps?: Omit<CheckmarkProps, 'checked' | 'className' | 'style'>
}

export const Checkbox = React.forwardRef<HTMLFieldSetElement, CheckboxProps>(
  (
    {
      id,
      name,
      children,
      classNames,
      styles,
      checked,
      onChange,
      disabled,
      direction = 'row',
      alignItems = 'center',
      gap = '0.5rem',
      onClick,
      onKeyDown,
      fieldProps,
      checkmarkProps,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()

    const [internalChecked, setInternalChecked] = useState(checked ?? false)
    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internalChecked

    const Id = id ?? name

    const toggleChecked = () => {
      if (disabled) return

      const next = !isChecked

      if (!isControlled) {
        setInternalChecked(next)
      }

      onChange?.(next)
    }

    const handleClick: React.ComponentProps<'fieldset'>['onClick'] = (e) => {
      toggleChecked()
      onClick?.(e)
    }

    const handleKeyDown: React.ComponentProps<'fieldset'>['onKeyDown'] = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleChecked()
      }

      onKeyDown?.(e)
    }

    return (
      <Field
        {...props}
        ref={ref}
        id={Id}
        name={name}
        labelProps={{ htmlFor: id, ...fieldProps?.labelProps }}
        role="checkbox"
        direction={direction}
        alignItems={alignItems}
        gap={gap}
        classNames={classNames?.field}
        styles={styles?.field}
        aria-checked={isChecked}
        data-checked={isChecked}
        aria-disabled={disabled}
        data-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
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
            className={cn(`${global.prefixCls}-checkbox-inner`, classNames?.checkboxInner)}
            style={styles?.checkboxInner}
          />

          <Checkmark
            {...checkmarkProps}
            checked={isChecked}
            className={classNames?.checkmark}
            style={styles?.checkmark}
          />
        </span>

        {children}
      </Field>
    )
  }
)

Checkbox.displayName = 'Checkbox'
