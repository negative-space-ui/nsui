import { Input } from '@negative-space/input'
import React from 'react'
import { z } from 'zod'

import { Form, type FormProps, useField, zodAdaptor } from '../src'

export default {
  title: 'Data Entry/Form',
  component: Form,
  tags: ['autodocs']
}

function NameField() {
  const { value, error, onChange, onBlur } = useField('name')
  return (
    <div>
      <Input placeholder="Name" value={value as string} onChange={onChange} onBlur={onBlur} />
      {error && <span style={{ color: 'red', fontSize: 12 }}>{error}</span>}
    </div>
  )
}

function EmailField() {
  const { value, error, onChange, onBlur } = useField('email')
  return (
    <div>
      <Input placeholder="Email" value={value as string} onChange={onChange} onBlur={onBlur} />
      {error && <span style={{ color: 'red', fontSize: 12 }}>{error}</span>}
    </div>
  )
}

export const Default = (args: FormProps) => (
  <Form
    {...args}
    initialValues={{ name: '', email: '' }}
    validationMode="onBlur"
    validate={(values) => {
      const errors: Record<string, string> = {}
      if (!values.name) errors.name = 'Name is required'
      if (!values.email) errors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(values.email as string)) errors.email = 'Invalid email'
      return errors
    }}
    onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
  >
    <NameField />
    <EmailField />
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
    validationMode="onBlur"
    onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
  >
    <NameField />
    <EmailField />
    <button type="submit">Submit</button>
  </Form>
)
