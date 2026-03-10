import React, { useState } from 'react'

import { Switch, type SwitchProps } from '../src'

export default {
  title: 'Data Entry/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    classNames: {
      root: 'w-12 h-6 bg-neutral-200 data-[checked=true]:bg-blue-400 rounded-full p-1 transition-colors duration-300 ease-in-out',
      inner: 'w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out'
    }
  }
}

export const Default = (args: SwitchProps) => {
  const [checked, setChecked] = useState(false)

  return (
    <Switch
      {...args}
      checked={checked}
      onChange={setChecked}
      classNames={args.classNames}
      styles={args.styles}
    />
  )
}
