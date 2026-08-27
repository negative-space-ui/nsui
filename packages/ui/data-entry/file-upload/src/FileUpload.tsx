import { Button, type ButtonProps } from '@negative-space/button'
import { Field, type FieldProps } from '@negative-space/field'
import { type ClickableAnimation, cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface FileUploadProps extends Omit<ButtonProps, 'classNames' | 'styles'> {
  accept?: string
  multiple?: boolean
  capture?: boolean | 'user' | 'environment'
  onFilesChange?: (files: File[]) => void

  classNames?: {
    field?: FieldProps['classNames']
    button?: ButtonProps['classNames']
  }

  styles?: {
    field?: FieldProps['styles']
    button?: ButtonProps['styles']
  }
  animation?: ClickableAnimation
  fieldProps?: FieldProps
}

export const FileUpload = React.forwardRef<HTMLButtonElement, FileUploadProps>(
  (
    {
      classNames,
      styles,
      children,
      onClick,
      id,
      name,
      animation,
      fieldProps,
      accept,
      multiple,
      capture,
      onFilesChange,
      ...props
    },
    ref
  ) => {
    const { global, components } = useNSUI()
    const inputRef = React.useRef<HTMLInputElement>(null)

    const Id = id ?? name
    const Animation = animation ?? components?.fileUpload?.animation

    return (
      <Field {...fieldProps} labelProps={{ htmlFor: Id, ...fieldProps?.labelProps }}>
        <input
          ref={inputRef}
          id={Id}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          capture={capture}
          hidden
          onChange={(event) => {
            onFilesChange?.(Array.from(event.target.files ?? []))
          }}
        />

        <Button
          {...props}
          ref={ref}
          type="button"
          animation={Animation}
          classNames={{
            root: cn(`${global.prefixCls}-file-upload`, classNames?.button?.root),
            ...classNames?.button
          }}
          styles={styles?.button}
          onClick={(event) => {
            onClick?.(event)

            if (!event.defaultPrevented) {
              inputRef.current?.click()
            }
          }}
        >
          {children}
        </Button>
      </Field>
    )
  }
)

FileUpload.displayName = 'FileUpload'
