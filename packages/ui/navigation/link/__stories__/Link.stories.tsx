import React from 'react'

import { Link, type LinkProps } from '..'

export default {
  title: 'Nav/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    children: 'Link',
    href: 'https://example.com',
    underline: true,
    className: 'text-blue-600'
  }
}

export const Default = (args: LinkProps) => <Link {...args} />
