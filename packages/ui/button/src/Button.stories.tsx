import React from 'react'
import { Button, type ButtonProps } from './Button'

export default {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    classNames: {
      btn: 'w-25 h-10 bg-neutral-300 rounded-md border-1 border-neutral-400/50 text-neutral-700 font-medium hover:bg-neutral-400 active:scale-97'
    },
    disabled: false,
    isLoading: false,
    isRippleDisabled: false,
    spinnerPosition: 'full',
    spinnerProps: {
      className: 'w-4.5 h-4.5 border-4 border-solid border-neutral-500 border-t-blue-500'
    }
  },
  argTypes: {
    children: { control: 'text' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    spinner: { control: 'text' },
    spinnerPosition: {
      control: 'select',
      options: ['full', 'prefix', 'content', 'suffix']
    }
  }
}

export const Default = (args: ButtonProps) => <Button {...args} />
