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
  headingProps?: Omit<HeadingElement, 'children' | 'className' | 'style'>
  description?: string
  descriptionProps?: Omit<TextElement, 'children' | 'className' | 'style'>
}

export function Info({
  classNames,
  styles,
  heading,
  headingProps,
  description,
  descriptionProps,
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
        <Heading {...headingProps} className={classNames?.heading} style={styles?.heading}>
          {heading}
        </Heading>
      )}
      {description && (
        <Text {...descriptionProps} className={classNames?.description} style={styles?.description}>
          {description}
        </Text>
      )}
    </div>
  )
}
