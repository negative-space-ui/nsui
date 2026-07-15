import React from 'react'

import { ButtonGroup, type ButtonGroupProps } from '..'

export default {
  title: 'Actions/Button group',
  component: ButtonGroup,
  tags: ['autodocs'],
  args: {
    items: [{ button: { children: 'Button 1' } }, { iconButton: { children: '🔍' } }],
    gap: '0.4rem',
    classNames: {
      root: 'w-30',
      button: { root: 'cursor-pointer p-2 bg-neutral-300 rounded-md' },
      iconButton: 'cursor-pointer p-2'
    }
  },
  argTypes: {
    disabled: { control: 'boolean' }
  }
}

export const Default = (args: ButtonGroupProps) => <ButtonGroup {...args} />
