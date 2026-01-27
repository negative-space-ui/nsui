import React, { useEffect, useRef } from 'react'
import { cn, useNSUI } from '@negative-space/system'

export interface CheckmarkProps extends React.SVGProps<SVGSVGElement> {
  checked?: boolean
  isPopDisabled?: boolean
}

export const Checkmark = ({
  checked = true,
  isPopDisabled,
  className,
  ...props
}: CheckmarkProps) => {
  const { global, components } = useNSUI()
  const IsPopDisabled = isPopDisabled ?? components.checkmark.isPopDisabled
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!IsPopDisabled && checked && ref.current) {
      ref.current.classList.remove(`${global.prefixCls}-pop`)
      void ref.current.getBoundingClientRect()
      ref.current.classList.add(`${global.prefixCls}-pop`)
    }
  }, [checked, IsPopDisabled, global.prefixCls])

  return (
    <svg
      {...props}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-visible={checked}
      className={cn(`${global.prefixCls}-checkmark ${global.prefixCls}-fade`, className)}
    >
      <polyline points="20 6 9 17 4 12 " />
    </svg>
  )
}
