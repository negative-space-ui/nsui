import React, { useEffect, useRef } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex, type FlexProps } from '@negative-space/flex'
import { useRadioContext } from './useRadioContext'

export interface RadioOptionProps extends Omit<
  FlexProps<'label'>,
  'as' | 'className' | 'style' | 'onClick'
> {
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
  disabled?: boolean
  value: string
  label: React.ReactNode
  isPopDisabled?: boolean
}

export const RadioOption = React.forwardRef<HTMLDivElement, RadioOptionProps>(
  ({ value, label, disabled, classNames, styles, ...props }) => {
    const { global } = useNSUI()
    const { selectedValue, onChange, disabled: groupDisabled, roving } = useRadioContext()

    const ref = useRef<HTMLDivElement>(null)
    const isDisabled = disabled ?? groupDisabled
    const checked = selectedValue === value

    useEffect(() => {
      roving.registerItem({
        id: value,
        ref: ref as React.RefObject<HTMLElement>,
        disabled: isDisabled
      })
      return () => roving.unregisterItem(value)
    }, [value, isDisabled, roving])

    return (
      <Flex
        {...props}
        as="label"
        alignItems="center"
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
          tabIndex={roving.hasInteracted && roving.activeId === value ? 0 : -1}
          data-disabled={isDisabled}
          onClick={() => {
            if (!isDisabled) {
              roving.focusItem(value)
              onChange?.(value)
            }
          }}
          onKeyDown={(e) => roving.handleItemKeyDown(e, value, onChange)}
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
              classNames?.inner
            )}
            style={{
              borderRadius: '50%',
              ...styles?.inner
            }}
          />
        </div>
        {label}
      </Flex>
    )
  }
)

RadioOption.displayName = 'RadioOption'
