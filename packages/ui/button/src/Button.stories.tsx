import React from 'react'
import { Button, type ButtonProps } from './Button'

export default {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    prefix: { control: { type: 'text' } },
    suffix: { control: { type: 'text' } },
    children: { control: { type: 'text' } },
    spinner: { control: { type: 'text' } },
    spinnerPosition: {
      control: {
        type: 'select',
        options: ['full', 'prefix', 'content', 'suffix'],
        defaultValue: 'full'
      }
    },
    disabled: { control: { type: 'boolean' } }
  }
}

export const Default = (args: ButtonProps) => (
  <Button
    {...args}
    classNames={
      args.classNames ?? {
        btn: 'w-25 h-10 bg-neutral-300 rounded-md border-1 border-neutral-400/50 text-neutral-700 font-medium hover:bg-neutral-400 active:scale-97'
      }
    }
    spinnerProps={{
      className: 'w-4.5 h-4.5 border-4 border-solid border-neutral-500 border-t-blue-500'
    }}
  >
    {args.children ?? 'Button'}
  </Button>
)
