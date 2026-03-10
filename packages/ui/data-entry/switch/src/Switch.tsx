import { Field } from '@negative-space/field'
import { cn, useNSUI } from '@negative-space/system'
import React, { useEffect, useRef, useState } from 'react'

export interface SwitchProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'className' | 'style'
> {
  classNames?: {
    field: {
      root?: string
      label: string
      error?: string
    }
    root?: string
    inner?: string
  }
  styles?: {
    field?: {
      root?: React.CSSProperties
      label?: React.CSSProperties
      error?: React.CSSProperties
    }
    root?: React.CSSProperties
    inner?: React.CSSProperties
  }
  label?: React.ReactNode
  error?: React.ReactNode
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onChange, classNames, styles, label, error, ...props }, ref) => {
    const { global } = useNSUI()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
      if (buttonRef.current) {
        const btn = buttonRef.current
        const inner = btn.querySelector<HTMLSpanElement>('.' + `${global.prefixCls}-switch-inner`)
        if (inner) {
          const btnStyles = getComputedStyle(btn)
          const paddingLeft = parseFloat(btnStyles.paddingLeft)
          const paddingRight = parseFloat(btnStyles.paddingRight)
          const move = btn.clientWidth - inner.offsetWidth - paddingLeft - paddingRight
          setOffset(move)
        }
      }
    }, [global.prefixCls, checked])

    return (
      <Field label={label} error={error} classNames={classNames?.field} styles={styles?.field}>
        <button
          type="button"
          data-checked={checked}
          onClick={() => onChange?.(!checked)}
          ref={(node) => {
            buttonRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          className={cn(
            `${global.prefixCls}-switch ${global.prefixCls}-clickable`,
            classNames?.root
          )}
          style={{ position: 'relative', ...styles?.root }}
          {...props}
        >
          <span
            className={cn(`${global.prefixCls}-switch-inner`, classNames?.inner)}
            style={{
              display: 'block',
              borderRadius: '50%',
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
