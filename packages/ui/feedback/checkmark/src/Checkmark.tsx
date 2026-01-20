import React from 'react'
import { cn, useNSUI } from '@negative-space/system'

export interface CheckmarkProps extends React.SVGProps<SVGSVGElement> {
  checked?: boolean
  isPopDisabled?: boolean
}

export const Checkmark = ({ checked = true, isPopDisabled, ...props }: CheckmarkProps) => {
  const { global, components } = useNSUI()

  if (!checked) return null

  const IsPopDisabled = isPopDisabled ?? components.checkmark.isPopDisabled

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        `${global.prefixCls}-checkmark`,
        !IsPopDisabled && `${global.prefixCls}-pop ${global.scaleTransitionDuration}ms`,
        props.className
      )}
    >
      <polyline points="20 6 9 17 4 12 " />
    </svg>
  )
}
