import React, { useId } from 'react'
import { Heading, type HeadingElement } from '@negative-space/heading'

export interface CollectionGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'aria-labelledby' | 'className' | 'role' | 'style'
> {
  classNames?: {
    root?: string
    label?: string
  }
  styles?: {
    root?: React.CSSProperties
    label?: React.CSSProperties
  }
  label?: string
  headingAs?: HeadingElement
}

export function CollectionGroup({
  children,
  classNames,
  styles,
  label,
  headingAs = 'h3',
  ...props
}: CollectionGroupProps) {
  const id = useId()

  return (
    <div
      role="group"
      aria-labelledby={label ? id : undefined}
      className={classNames?.root}
      style={styles?.root}
      {...props}
    >
      {label && (
        <Heading id={id} as={headingAs} className={classNames?.label} style={styles?.label}>
          {label}
        </Heading>
      )}
      {children}
    </div>
  )
}

CollectionGroup.displayName = 'CollectionGroup'
