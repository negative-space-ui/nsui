import React from 'react'
import { Listbox, type ListboxProps } from '../src/Listbox'

export default {
  title: 'Data Entry/Listbox',
  component: Listbox,
  tags: ['autodocs'],
  args: {
    disabled: false,
    onChange: () => {},
    classNames: {
      listbox: 'border-1 border-neutral-300 rounded-md w-fit',
      option: 'data-[selected=true]:bg-neutral-200'
    },
    checkmarkProps: { className: 'w-3 h-3 text-neutral-600' },
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  }
}

export const Default = (args: ListboxProps) => {
  const [value, setValue] = React.useState(args.options?.[0]?.value)

  return (
    <Listbox
      {...args}
      value={value}
      onChange={(v) => {
        setValue(v)
        args.onChange?.(v)
      }}
    />
  )
}
