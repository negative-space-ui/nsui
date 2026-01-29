import React, { useCallback, useMemo, useState, useId } from 'react'
import { cn, mergeClassNames, useNSUI } from '@negative-space/system'
import { Flex, type FlexProps } from '@negative-space/flex'
import { useRovingFocus } from '@negative-space/roving-focus'
import { RadioOption, type RadioOptionProps } from './RadioOption'
import { RadioContext } from './RadioContext'

export interface RadioGroupProps extends Omit<FlexProps, 'children' | 'onChange'> {
  classNames?: {
    root?: string
    option?: {
      label?: string
      radio?: string
      inner?: string
    }
  }
  styles?: {
    root?: React.CSSProperties
    option?: {
      label?: React.CSSProperties
      radio?: React.CSSProperties
      inner?: React.CSSProperties
    }
  }
  name?: string
  disabled?: boolean
  options?: RadioOptionProps[]
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      classNames,
      styles,
      disabled = false,
      options,
      direction = 'column',
      name: nameProp,
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()
    const autoName = useId()
    const name = nameProp ?? autoName

    const [selectedValue, setSelectedValue] = useState(defaultValue)
    const roving = useRovingFocus()

    const handleChange = useCallback(
      (value: string) => {
        setSelectedValue(value)
        roving.setActiveId(value)
        onValueChange?.(value)
      },
      [onValueChange, roving]
    )

    const contextValue = useMemo(
      () => ({
        name,
        disabled,
        selectedValue,
        onChange: handleChange,
        roving
      }),
      [name, disabled, selectedValue, handleChange, roving]
    )

    return (
      <RadioContext.Provider value={contextValue}>
        <Flex
          {...props}
          as="fieldset"
          ref={ref}
          direction={direction}
          role="radiogroup"
          tabIndex={roving.hasInteracted ? -1 : 0}
          onKeyDown={roving.handleGroupKeyDown}
          onBlur={roving.handleGroupBlur}
          className={cn(`${global.prefixCls}-radio-group`, classNames?.root)}
          style={styles?.root}
        >
          {options?.map((option, index) => (
            <RadioOption
              key={option.value ?? index}
              {...option}
              classNames={mergeClassNames(classNames?.option, option.classNames)}
              styles={{ ...styles?.option, ...option.styles }}
            />
          ))}
        </Flex>
      </RadioContext.Provider>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
