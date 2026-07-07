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
