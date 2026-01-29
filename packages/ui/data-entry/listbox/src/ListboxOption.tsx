import React, { cloneElement, isValidElement, useRef, useEffect } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex, type FlexProps } from '@negative-space/flex'
import { Checkmark, type CheckmarkProps } from '@negative-space/checkmark'
import { useListboxContext } from './useListboxContext'

export interface ListboxOptionProps extends Omit<
  FlexProps<'li'>,
  'as' | 'className' | 'onClick' | 'style'
> {
  value: string
  disabled?: boolean
  classNames?: {
    label?: string
    checkmark?: string
  }
  styles?: {
    label?: React.CSSProperties
    checkmark?: React.CSSProperties
  }
  checkmark?: React.ReactNode
  checkmarkProps?: Omit<CheckmarkProps, 'checked' | 'className' | 'style'>
  onClick?: (value: string, event: React.MouseEvent<HTMLDivElement>) => void
}

export const ListboxOption = ({
  children,
  value,
  disabled,
  classNames,
  styles,
  checkmark = <Checkmark />,
  checkmarkProps,
  onClick,
  alignItems = 'center',
  ...props
}: ListboxOptionProps) => {
  const { global } = useNSUI()
  const ctx = useListboxContext()
  const ref = useRef<HTMLDivElement>(null)

  if (!ctx) return null

  const { value: selectedValue, onChange, selectionMode, roving } = ctx

  const isActive = roving.activeId === value

  const isSelected =
    selectionMode === 'multiple'
      ? Array.isArray(selectedValue) && selectedValue.includes(value)
      : selectedValue === value

  useEffect(() => {
    roving.registerItem({
      id: value,
      ref: ref as React.RefObject<HTMLElement>,
      disabled
    })
    return () => roving.unregisterItem(value)
  }, [value, disabled, roving])

  const select = () => {
    if (disabled) return

    if (selectionMode === 'multiple') {
      const current = Array.isArray(selectedValue) ? selectedValue : []
      const next = isSelected ? current.filter((v) => v !== value) : [...current, value]

      onChange?.(next)
    } else {
      onChange?.(value)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      roving.focusItem(value)
      select()
      onClick?.(value, event)
    }
  }

  return (
    <Flex
      {...props}
      as="li"
      role="option"
      ref={ref}
      alignItems={alignItems}
      tabIndex={disabled ? -1 : roving.hasInteracted && isActive ? 0 : -1}
      aria-disabled={disabled}
      aria-selected={isSelected}
      onFocus={() => roving.focusItem(value)}
      onClick={handleClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
        roving.handleItemKeyDown(e, value, select, {
          role: 'option',
          allowHorizontal: false
        })
      }
      className={cn(
        `${global.prefixCls}-listbox-option ${global.prefixCls}-clickable`,
        classNames?.label
      )}
      style={styles?.label}
    >
      <span>{children}</span>

      {isValidElement(checkmark)
        ? cloneElement(checkmark, {
            ...(checkmark.type === Checkmark
              ? {
                  checked: isSelected,
                  className: classNames?.checkmark,
                  style: styles?.checkmark
                }
              : {}),
            ...checkmarkProps
          })
        : checkmark}
    </Flex>
  )
}
