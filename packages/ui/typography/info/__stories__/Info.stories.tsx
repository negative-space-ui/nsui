import React from 'react'

import { Info, type InfoProps } from '../src'

export default {
  title: 'Typography/Info',
  component: Info,
  tags: ['autodocs'],
  args: {
    heading: 'Title',
    description: 'Description',
    classNames: { heading: 'font-semibold' }
  }
}

export const Default = (args: InfoProps) => <Info {...args} />
