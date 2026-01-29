import React from 'react'
import { ButtonGroup, type ButtonGroupProps } from '../src/ButtonGroup'

export default {
  title: 'Actions/Buttons/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  args: {
    items: [{ iconButton: { children: '🔍' } }, { button: { children: 'Button 1' } }],
    classNames: { button: { btn: 'p-2 bg-neutral-300 rounded-md' }, iconButton: 'p-2' }
  },
  argTypes: {
    disabled: { control: 'boolean' }
  }
}

export const Default = (args: ButtonGroupProps) => <ButtonGroup {...args} />
