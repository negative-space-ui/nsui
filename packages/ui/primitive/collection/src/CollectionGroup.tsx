import { Heading, type HeadingElement } from '@negative-space/heading'
import React, { useId } from 'react'

export interface CollectionGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'aria-labelledby' | 'className' | 'role' | 'style'
> {
  classNames?: {
    root?: string
    heading?: string
  }
  styles?: {
    root?: React.CSSProperties
    heading?: React.CSSProperties
  }
  heading?: string
  headingProps?: Omit<HeadingElement, 'children' | 'className' | 'style'>
}

export function CollectionGroup({
  children,
  classNames,
  styles,
  heading,
  headingProps,
  ...props
}: CollectionGroupProps) {
  const id = useId()

  return (
    <div
      {...props}
      role="group"
      aria-labelledby={heading ? id : undefined}
      className={classNames?.root}
      style={styles?.root}
    >
      {heading && (
        <Heading {...headingProps} id={id} className={classNames?.heading} style={styles?.heading}>
          {heading}
        </Heading>
      )}
      {children}
    </div>
  )
}

CollectionGroup.displayName = 'CollectionGroup'
