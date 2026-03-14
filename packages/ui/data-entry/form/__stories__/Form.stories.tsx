import { Input } from '@negative-space/input'
import React from 'react'
import { z } from 'zod'

import { Form, type FormProps, zodAdaptor } from '../src'

export default {
  title: 'Data Entry/Form',
  component: Form,
  tags: ['autodocs'],
  args: {
    validationMode: 'onChange'
  },
  argTypes: {
    validate: { control: 'object' }
  }
}

export const Default = (args: FormProps) => (
  <Form
    {...args}
    initialValues={{ name: '', email: '' }}
    validate={(values) => {
      const errors: Record<string, string> = {}

      if (!values.name) errors.name = 'Name is required'

      if (!values.email) errors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(values.email as string)) errors.email = 'Invalid email'

      return errors
    }}
    onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
  >
    <Input name="name" placeholder="Name" />
    <Input name="email" placeholder="Email" />

    <button type="submit">Submit</button>
  </Form>
)

const schema = z.object({
  name: z.string().min(1, 'Name is required').default(''),
  email: z.string().min(1, 'Email is required').email('Invalid email').default('')
})

export const WithZod = (args: FormProps) => (
  <Form
    {...args}
    {...zodAdaptor(schema)}
    onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
  >
    <Input name="name" placeholder="Name" />
    <Input name="email" placeholder="Email" />

    <button type="submit">Submit</button>
  </Form>
)
