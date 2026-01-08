import React, { useEffect, useId, useRef } from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'
import { useCollectionContext } from './CollectionContext'

export interface CollectionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

export const CollectionItem = ({
  children,
  className,
  disabled,
  ...props
}: CollectionItemProps) => {
  const { global } = useNSUI()
  const { registerItem, unregisterItem, activeId, setActiveId } = useCollectionContext()

  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const isActive = activeId === id

  useEffect(() => {
    registerItem({ id, ref, disabled })
    return () => unregisterItem(id)
  }, [id, disabled, registerItem, unregisterItem])

  return (
    <div
      {...props}
      ref={ref}
      tabIndex={disabled ? undefined : isActive ? 0 : -1}
      aria-disabled={disabled}
      onFocus={() => setActiveId(id)}
      className={clsx(`${global.prefixCls}-collection-item`, className)}
    >
      {children}
    </div>
  )
}
