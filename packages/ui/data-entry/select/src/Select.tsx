import { Button, type ButtonProps, IconButton, type IconButtonProps } from '@negative-space/button'
import { Field, type FieldProps } from '@negative-space/field'
import { Listbox, type ListboxProps } from '@negative-space/listbox'
import {
  Popover,
  type PopoverProps,
  usePopover,
  type UsePopoverOptions
} from '@negative-space/popover'
import { ChevronDown, cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type SelectPopoverProps = Omit<
  PopoverProps,
  'children' | 'className' | 'style' | 'ref' | 'popover'
> &
  Omit<UsePopoverOptions, 'overlay' | 'showArrow'>

export type SelectProps = Omit<FieldProps, 'children' | 'className' | 'style' | 'ref'> &
  Omit<ListboxProps, 'children' | 'className' | 'style' | 'ref'> & {
    classNames?: {
      trigger?: ButtonProps['classNames']
      iconButton?: IconButtonProps['classNames']
      field?: FieldProps['classNames']
      popover?: PopoverProps['classNames']
      listbox?: ListboxProps['classNames']
    }
    styles?: {
      trigger?: ButtonProps['styles']
      iconButton?: IconButtonProps['styles']
      field?: FieldProps['styles']
      popover?: PopoverProps['styles']
      listbox?: ListboxProps['styles']
    }
    triggerProps?: Omit<ButtonProps, 'children' | 'className' | 'style' | 'ref'>
    popoverProps?: SelectPopoverProps
    placeholder?: React.ReactNode
  }

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      classNames,
      styles,
      placeholder,
      items,
      defaultValue,
      onValueChange,
      triggerProps,
      popoverProps,
      ...fieldProps
    },
    ref
  ) => {
    const { global, components } = useNSUI()

    const Animation = triggerProps?.animation ?? components.select.animation

    const [value, setValue] = React.useState<string | string[] | null>(defaultValue ?? null)

    const popover = usePopover({
      ...popoverProps
    })

    const selectedItem = React.useMemo(() => {
      if (typeof value !== 'string') {
        return undefined
      }

      return items.find((item) => 'option' in item && item.option?.value === value)
    }, [items, value])

    const handleValueChange = React.useCallback(
      (next: string | string[]) => {
        setValue(next)
        onValueChange?.(next)
        popover.close()
      },
      [onValueChange, popover]
    )

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        popover.referenceRef(node)

        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [popover, ref]
    )

    const Suffix = triggerProps?.suffix ?? (
      <IconButton classNames={classNames?.iconButton}>
        <ChevronDown
          style={{
            rotate: `${popover.isOpen ? 180 : 0}deg`,
            ...styles?.iconButton?.icon
          }}
        />
      </IconButton>
    )

    return (
      <>
        <Field {...fieldProps} classNames={classNames?.field} styles={styles?.field}>
          <Button
            ref={setRefs}
            {...popover.getReferenceProps()}
            {...triggerProps}
            suffix={Suffix}
            animation={Animation}
            classNames={{
              root: cn(`${global.prefixCls}-select`, classNames?.trigger?.root),
              ...classNames?.trigger
            }}
            styles={styles?.trigger}
          >
            {'option' in (selectedItem ?? {}) ? selectedItem?.option?.children : placeholder}
          </Button>
        </Field>

        <Popover popover={popover} classNames={classNames?.popover} styles={styles?.popover}>
          <Listbox
            items={items}
            defaultValue={value ?? undefined}
            onValueChange={handleValueChange}
            classNames={classNames?.listbox}
            styles={styles?.listbox}
          />
        </Popover>
      </>
    )
  }
)

Select.displayName = 'Select'
