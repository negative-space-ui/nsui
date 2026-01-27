import React, { useEffect, useRef } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex, type FlexProps } from '@negative-space/flex'
import { Checkmark, type CheckmarkProps } from '@negative-space/checkmark'
import { useListboxContext } from './ListboxContext'

export interface ListboxOptionProps extends Omit<FlexProps<'li'>, 'as' | 'onClick'> {
  value: string
  disabled?: boolean
  checkmarkProps?: CheckmarkProps
  onClick?: (value: string, event: React.MouseEvent<HTMLDivElement>) => void
}

export const ListboxOption = ({
  children,
  className,
  checkmarkProps,
  value,
  disabled,
  onClick,
  alignItems = 'center',
  ...props
}: ListboxOptionProps) => {
  const { global } = useNSUI()
  const { registerOption, unregisterOption, activeId, setActiveId, toggleSelection, isSelected } =
    useListboxContext()

  const ref = useRef<HTMLDivElement>(null)
  const id = value
  const isActive = activeId === id
  const selected = isSelected(value)

  useEffect(() => {
    registerOption({ id, ref, disabled })
    return () => unregisterOption(id)
  }, [id, disabled, registerOption, unregisterOption])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    setActiveId(id)
    toggleSelection(value)
    onClick?.(value, event)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleSelection(value)
    }
  }

  return (
    <Flex
      {...props}
      as="li"
      role="option"
      ref={ref}
      alignItems={alignItems}
      tabIndex={disabled ? undefined : isActive ? 0 : -1}
      aria-disabled={disabled}
      aria-selected={selected}
      onFocus={() => setActiveId(id)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(`${global.prefixCls}-listbox-option ${global.prefixCls}-clickable`, className)}
    >
      <span>{children}</span>
      {selected && <Checkmark {...checkmarkProps} />}
    </Flex>
  )
}
