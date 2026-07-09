import React from 'react'

import { Link, type LinkProps } from '..'

export default {
  title: 'Nav/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    underline: false,
    children: 'Link',
    href: 'https://example.com'
  }
}

export const Default = (args: LinkProps) => <Link {...args} />
