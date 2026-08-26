import React from 'react'

import { Toggle, type ToggleProps } from '..'

export default {
  title: 'Action/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {
    children: 'Toggle',
    classNames: {
      root: 'w-fit cursor-pointer rounded-md border border-neutral-300 bg-neutral-200 px-2 py-1 data-[pressed=true]:border-neutral-400 data-[pressed=true]:bg-neutral-300'
    }
  }
}

export const Default = (args: ToggleProps) => <Toggle {...args} />

export const Active = (args: ToggleProps) => <Toggle {...args} pressed />
