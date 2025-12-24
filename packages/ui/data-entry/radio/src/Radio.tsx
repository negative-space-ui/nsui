import React from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'
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
  }
  styles?: {
    label?: React.CSSProperties
    radio?: React.CSSProperties
  }
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ classNames, styles, value, children, disabled: disabledProp, ...props }, ref) => {
    const { global } = useNSUI()

    const { name, selectedValue, onChange, disabled: groupDisabled } = useRadioContext()

    const disabled = disabledProp ?? groupDisabled

    return (
      <Flex
        as="label"
        alignItems="center"
        disabled={disabled}
        data-disabled={disabled}
        className={clsx(`${global.prefixCls}-radio-label`, classNames?.label)}
        style={styles?.label}
      >
        <input
          {...props}
          ref={ref}
          type="radio"
          name={name}
          value={value}
          disabled={disabled}
          data-disabled={disabled}
          checked={selectedValue === value}
          onChange={() => onChange?.(value)}
          className={clsx(`${global.prefixCls}-radio`, classNames?.radio)}
          style={styles?.radio}
        />
        {children}
      </Flex>
    )
  }
)

Radio.displayName = 'Radio'
