import { Collection, type CollectionProps } from '@negative-space/collection'
import { Field, type FieldProps } from '@negative-space/field'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import React, { useCallback, useId, useMemo, useState } from 'react'

import { RadioContext } from './RadioContext'
import { RadioOption, type RadioOptionProps } from './RadioOption'

export interface RadioGroupProps extends Omit<CollectionProps, 'rovingOptions'> {
  classNames?: {
    field?: FieldProps['classNames']
    root?: string
    option?: RadioOptionProps['classNames']
  }
  styles?: {
    field?: FieldProps['styles']
    root?: React.CSSProperties
    option?: RadioOptionProps['styles']
  }
  name?: string
  disabled?: boolean
  options?: RadioOptionProps[]
  defaultValue?: string
  onValueChange?: (value: string) => void
  fieldProps?: Omit<FieldProps, 'classNames' | 'styles'>
}

export function RadioGroup({
  classNames,
  styles,
  disabled = false,
  options,
  name: nameProp,
  defaultValue,
  onValueChange,
  fieldProps,
  ...props
}: RadioGroupProps) {
  const { global } = useNSUI()
  const autoName = useId()
  const name = nameProp ?? autoName

  const [selectedValue, setSelectedValue] = useState(defaultValue)

  const handleChange = useCallback(
    (value: string) => {
      setSelectedValue(value)
      onValueChange?.(value)
    },
    [onValueChange]
  )

  const contextValue = useMemo(
    () => ({
      name,
      disabled,
      selectedValue,
      onChange: handleChange
    }),
    [name, disabled, selectedValue, handleChange]
  )

  return (
    <RadioContext.Provider value={contextValue}>
      <Field {...fieldProps} classNames={classNames?.field} styles={styles?.field}>
        <Collection
          {...props}
          role="radiogroup"
          disabled={disabled}
          rovingOptions={{ containerRole: 'radiogroup' }}
          className={cn(`${global.prefixCls}-radio-group`, classNames?.root)}
          style={styles?.root}
        >
          {options?.map((option, index) => (
            <RadioOption
              key={option.value ?? index}
              {...option}
              classNames={mergeCn(classNames?.option, option.classNames)}
              styles={{ ...styles?.option, ...option.styles }}
            />
          ))}
        </Collection>
      </Field>
    </RadioContext.Provider>
  )
}

RadioGroup.displayName = 'RadioGroup'
