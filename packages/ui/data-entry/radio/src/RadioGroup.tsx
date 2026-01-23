import React, { useState, useId } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex, FlexProps } from '@negative-space/flex'
import { RadioProvider } from './RadioProvider'
import { Radio } from './Radio'

export interface RadioGroupProps extends Omit<FlexProps, 'onChange'> {
  name?: string
  disabled?: boolean
  value?: string | number
  onChange?: (value: string | number) => void
}

export const RadioGroup = ({
  direction = 'column',
  className,
  value: valueProp,
  onChange,
  name: nameProp,
  disabled = false,
  children,
  ...props
}: RadioGroupProps) => {
  const { global } = useNSUI()

  const autoName = useId()
  const name = nameProp ?? autoName

  const [internalValue, setInternalValue] = useState<string | number | undefined>(valueProp)
  const value = valueProp !== undefined ? valueProp : internalValue

  const handleChange = (newValue: string | number) => {
    if (valueProp === undefined) setInternalValue(newValue)
    onChange?.(newValue)
  }

  if (process.env.NODE_ENV !== 'production') {
    const countRadios = (nodes: React.ReactNode): number => {
      return React.Children.toArray(nodes).reduce((acc: number, child) => {
        if (!React.isValidElement(child)) return acc
        if (child.type === Radio) return acc + 1
        const childChildren = (child.props as { children?: React.ReactNode })?.children
        return acc + countRadios(childChildren)
      }, 0)
    }

    const radiosCount = countRadios(children)
    if (radiosCount === 1) {
      console.warn('RadioGroup has only one Radio. Consider using multiple options for clarity.')
    }
  }

  return (
    <RadioProvider name={name} selectedValue={value} onChange={handleChange} disabled={disabled}>
      <Flex
        {...props}
        direction={direction}
        className={cn(`${global.prefixCls}-radio-group`, className)}
      >
        {children}
      </Flex>
    </RadioProvider>
  )
}
