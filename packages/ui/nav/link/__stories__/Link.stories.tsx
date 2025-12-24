import React from 'react'
import { Link, type LinkProps } from '../src/Link'

export default {
  title: 'Nav/Link',
  component: Link,
  tags: ['autodocs']
}

export const Default = (args: LinkProps) => (
  <Link {...args} href="https://example.com">
    Link
  </Link>
)
