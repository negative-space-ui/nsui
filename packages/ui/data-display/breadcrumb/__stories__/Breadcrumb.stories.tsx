import React from 'react'

import { Breadcrumb, type BreadcrumbProps } from '..'

export default {
  title: 'Data Display/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    gap: '0.3rem',
    classNames: {
      items: { label: 'text-blue-600 data-[current=true]:text-neutral-950' }
    },
    items: [
      {
        label: 'Home',
        href: '/'
      },
      {
        label: 'Components',
        href: '/components'
      },
      {
        label: 'Breadcrumb',
        href: '/components/breadcrumb'
      }
    ]
  }
}

export const Default = (args: BreadcrumbProps) => <Breadcrumb {...args} />
