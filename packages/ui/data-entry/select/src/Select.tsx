import { Button, type ButtonProps } from '@negative-space/button'
import { Field, type FieldProps } from '@negative-space/field'
import { Listbox, type ListboxProps } from '@negative-space/listbox'
import { Popover, type PopoverProps, usePopover } from '@negative-space/popover'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type SelectProps = Omit<FieldProps, 'children' | 'className' | 'style' | 'ref'> &
  Omit<ButtonProps, 'className' | 'style' | 'ref'> &
  Omit<ListboxProps, 'children' | 'className' | 'style' | 'ref'> &
  Omit<PopoverProps, 'children' | 'className' | 'style' | 'ref'> & {
    classNames?: {
      trigger?: ButtonProps['classNames']
      field?: FieldProps['classNames']
      popover?: PopoverProps['classNames']
      listbox?: ListboxProps['classNames']
    }
    styles?: {
      trigger?: ButtonProps['styles']
      field?: FieldProps['styles']
      popover?: PopoverProps['styles']
      listbox?: ListboxProps['styles']
    }
  }

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ classNames, styles, items, children, ...rest }, ref) => {
    const { global } = useNSUI()
    const popover = usePopover({ placement: 'bottom' })

    return (
      <>
        <Field {...(rest as FieldProps)} classNames={classNames?.field} styles={styles?.field}>
          <Button
            {...popover.triggerProps}
            {...rest}
            ref={ref}
            type="button"
            classNames={{
              root: cn(`${global.prefixCls}-select`, classNames?.trigger?.root),
              ...classNames?.trigger
            }}
            styles={styles?.trigger}
          >
            {children}
          </Button>
        </Field>
        <Popover popover={popover} classNames={classNames?.popover} styles={styles?.popover}>
          <Listbox
            items={items}
            classNames={classNames?.listbox}
            styles={styles?.listbox}
            {...rest}
          />
        </Popover>
      </>
    )
  }
)

Select.displayName = 'Select'
