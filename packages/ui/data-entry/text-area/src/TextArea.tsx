import { Field, type FieldProps } from '@negative-space/field'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className' | 'style'
> {
  classNames?: {
    field?: FieldProps['classNames']
    wrapper?: string
    root?: string
    characterCount?: string
  }
  styles?: {
    field?: FieldProps['styles']
    wrapper?: React.CSSProperties
    root?: React.CSSProperties
    characterCount?: React.CSSProperties
  }
  showCharacterCount?: boolean
  fieldProps?: Omit<FieldProps, 'classNames' | 'styles'>
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      classNames,
      styles,
      id,
      name,
      showCharacterCount = false,
      maxLength,
      value,
      defaultValue,
      onChange,
      fieldProps,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()

    const Id = name ?? id

    const [characterCount, setCharacterCount] = React.useState(
      String(value ?? defaultValue ?? '').length
    )

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharacterCount(event.target.value.length)
      onChange?.(event)
    }

    return (
      <Field {...fieldProps} classNames={classNames?.field} styles={styles?.field}>
        <div
          className={cn(`${global.prefixCls}-text-area-wrapper`, classNames?.wrapper)}
          style={styles?.wrapper}
        >
          <textarea
            {...props}
            ref={ref}
            id={Id}
            name={name}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={handleChange}
            className={cn(`${global.prefixCls}-text-area`, classNames?.root)}
            style={styles?.root}
          />

          {showCharacterCount && maxLength !== undefined && (
            <span className={classNames?.characterCount} style={styles?.characterCount}>
              {characterCount}/{maxLength}
            </span>
          )}
        </div>
      </Field>
    )
  }
)
