import { Field, type FieldProps } from '@negative-space/field'
import { cn, useNSUI } from '@negative-space/system'
import React, { useEffect, useRef, useState } from 'react'

export interface SwitchProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'className' | 'style'
> {
  classNames?: {
    field: FieldProps['classNames']
    root?: string
    inner?: string
  }
  styles?: {
    field?: FieldProps['styles']
    root?: React.CSSProperties
    inner?: React.CSSProperties
  }
  checked?: boolean
  onChange?: (checked: boolean) => void
  fieldProps?: Omit<FieldProps, 'classNames' | 'styles'>
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ id, name, classNames, styles, checked = false, onChange, fieldProps, ...props }, ref) => {
    const { global } = useNSUI()

    const buttonRef = useRef<HTMLButtonElement>(null)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
      if (buttonRef.current) {
        const button = buttonRef.current
        const inner = button.querySelector<HTMLSpanElement>(
          '.' + `${global.prefixCls}-switch-inner`
        )
        if (inner) {
          const buttonStyles = getComputedStyle(button)
          const paddingLeft = parseFloat(buttonStyles.paddingLeft)
          const paddingRight = parseFloat(buttonStyles.paddingRight)
          const move = button.clientWidth - inner.offsetWidth - paddingLeft - paddingRight
          setOffset(move)
        }
      }
    }, [global.prefixCls, checked])

    return (
      <Field
        {...fieldProps}
        labelProps={{ htmlFor: id, ...fieldProps?.labelProps }}
        classNames={classNames?.field}
        styles={styles?.field}
      >
        <button
          {...props}
          type="button"
          id={id}
          name={name}
          data-checked={checked}
          onClick={() => onChange?.(!checked)}
          ref={(node) => {
            buttonRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          className={cn(classNames?.root)}
          style={{ borderRadius: '9999px', ...styles?.root }}
        >
          <span
            className={cn(`${global.prefixCls}-switch-inner`, classNames?.inner)}
            style={{
              display: 'block',
              borderRadius: '9999px',
              transform: checked ? `translateX(${offset}px)` : 'translateX(0)',
              ...styles?.inner
            }}
          />
        </button>
      </Field>
    )
  }
)

Switch.displayName = 'Switch'
