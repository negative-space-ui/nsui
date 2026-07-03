import { Heading, type HeadingElement } from '@negative-space/heading'
import { cn, useNSUI } from '@negative-space/system'
import { Text, type TextElement } from '@negative-space/text'
import React from 'react'

export interface InfoProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'style'
> {
  classNames?: {
    root?: string
    heading?: string
    description?: string
  }
  styles?: {
    root?: React.CSSProperties
    heading?: React.CSSProperties
    description?: React.CSSProperties
  }
  heading?: string
  headingAs?: HeadingElement
  description?: string
  descriptionAs?: TextElement
}

export function Info({
  classNames,
  styles,
  heading,
  headingAs,
  description,
  descriptionAs,
  ...props
}: InfoProps) {
  const { global } = useNSUI()

  return (
    <div
      {...props}
      className={cn(`${global.prefixCls}-info`, classNames?.root)}
      style={styles?.root}
    >
      {heading && (
        <Heading as={headingAs} className={classNames?.heading} style={styles?.heading}>
          {heading}
        </Heading>
      )}
      {description && (
        <Text as={descriptionAs} className={classNames?.description} style={styles?.description}>
          {description}
        </Text>
      )}
    </div>
  )
}
