import React from 'react'
import { Link, type LinkProps } from '../src'

export default {
  title: 'Nav/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    disabled: false,
    underline: false
  }
}

export const Default = (args: LinkProps) => (
  <Link {...args} href="https://example.com">
    Link
  </Link>
)
