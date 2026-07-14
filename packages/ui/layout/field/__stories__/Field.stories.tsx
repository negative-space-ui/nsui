import React from 'react'

import { Field, type FieldProps } from '..'

export default {
  title: 'Layout/Field',
  component: Field,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    children: 'Field content',
    error: 'Error message'
  }
}

export const Default = (args: FieldProps) => <Field {...args} />

export const Input = (args: FieldProps) => (
  <Field
    {...args}
    gap="0.2rem"
    classNames={{ label: 'cursor-pointer ml-1', error: 'ml-1' }}
    labelProps={{ htmlFor: 'input' }}
    children={
      <input
        id="input"
        className="rounded-md border-1 border-neutral-200 bg-neutral-100 px-2 outline-none focus:border-neutral-300"
      />
    }
  />
)
