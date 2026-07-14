import React from 'react'

import { ButtonGroup, type ButtonGroupProps } from '..'

export default {
  title: 'Actions/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  args: {
    items: [{ button: { children: 'Button 1' } }, { iconButton: { children: '🔍' } }],
    classNames: {
      button: { root: 'cursor-pointer p-2 bg-neutral-300 rounded-md' },
      iconButton: 'cursor-pointer p-2'
    }
  },
  argTypes: {
    disabled: { control: 'boolean' }
  }
}

export const Default = (args: ButtonGroupProps) => <ButtonGroup {...args} />
