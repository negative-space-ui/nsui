import { Input } from '@negative-space/input'
import { expect, userEvent, within } from '@storybook/test'
import React, { useEffect, useRef } from 'react'
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

function TrackedInput({
  mountCount,
  unmountCount,
  ...props
}: {
  mountCount: React.MutableRefObject<number>
  unmountCount: React.MutableRefObject<number>
  [key: string]: unknown
}) {
  useEffect(() => {
    mountCount.current += 1
    return () => {
      unmountCount.current += 1
    }
  }, [])

  return <Input {...props} />
}

export const BlurDoesNotUnmountChildren = {
  render: (args: FormProps) => {
    const mountCount = useRef(0)
    const unmountCount = useRef(0)

    return (
      <Form
        {...args}
        initialValues={{ name: '', email: '' }}
        validate={(values) => {
          const errors: Record<string, string> = {}
          if (!values.name) errors.name = 'Name is required'
          if (!values.email) errors.email = 'Email is required'
          return errors
        }}
        onSubmit={() => {}}
        validationMode="onBlur"
      >
        <TrackedInput
          name="name"
          placeholder="Name"
          mountCount={mountCount}
          unmountCount={unmountCount}
        />
        <Input name="email" placeholder="Email" />
        <button type="submit">Submit</button>
      </Form>
    )
  },

  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    const nameInput = canvas.getByPlaceholderText('Name')

    await userEvent.click(nameInput)
    await userEvent.tab()

    await expect(canvas.getByText('Name is required')).toBeInTheDocument()

    const emailInput = canvas.getByPlaceholderText('Email')
    await userEvent.click(emailInput)
    await userEvent.tab()

    await expect(canvas.getByText('Email is required')).toBeInTheDocument()

    await expect(canvas.getByPlaceholderText('Name')).toBeInTheDocument()
  }
}

function PasswordLikeInput(props: Record<string, unknown>) {
  const [show, setShow] = React.useState(false)
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <Input {...props} type={show ? 'text' : 'password'} />
      <button type="button" data-testid="toggle-visibility" onClick={() => setShow((s) => !s)}>
        {show ? 'hide' : 'show'}
      </button>
    </div>
  )
}

export const InternalStateSurvivesBlur = {
  render: (args: FormProps) => (
    <Form {...args} initialValues={{ password: '' }} onSubmit={() => {}} validationMode="onBlur">
      <PasswordLikeInput name="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </Form>
  ),

  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByPlaceholderText('Password')).toHaveAttribute('type', 'password')

    await userEvent.click(canvas.getByTestId('toggle-visibility'))

    await expect(canvas.getByPlaceholderText('Password')).toHaveAttribute('type', 'text')

    await userEvent.tab()

    await expect(canvas.getByPlaceholderText('Password')).toHaveAttribute('type', 'text')
  }
}
