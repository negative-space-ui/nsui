import React, { useEffect, useId, useRef } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex, type FlexProps } from '@negative-space/flex'
import { Checkmark } from '@negative-space/checkmark'
import { useListboxContext } from './ListboxContext'

export interface ListboxOptionProps extends Omit<FlexProps, 'onClick'> {
  value: string
  disabled?: boolean
  onClick?: (value: string, event: React.MouseEvent<HTMLDivElement>) => void
}

export const ListboxOption = ({
  children,
  className,
  value,
  disabled,
  onClick,
  ...props
}: ListboxOptionProps) => {
  const { global } = useNSUI()
  const { registerOption, unregisterOption, activeId, setActiveId, toggleSelection, isSelected } =
    useListboxContext()

  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const isActive = activeId === id
  const selected = isSelected(value)

  useEffect(() => {
    registerOption({ id, ref, disabled })
    return () => unregisterOption(id)
  }, [id, disabled, registerOption, unregisterOption])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      toggleSelection(value)
      onClick?.(value, event)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      toggleSelection(value)
    }
  }

  return (
    <Flex
      {...props}
      as="li"
      role="option"
      alignItems="center"
      ref={ref}
      tabIndex={disabled ? undefined : isActive ? 0 : -1}
      aria-disabled={disabled}
      aria-selected={selected}
      onFocus={() => setActiveId(id)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(`${global.prefixCls}-listbox-option`, className)}
    >
      <span>{children}</span>
      {selected && <Checkmark />}
    </Flex>
  )
}
