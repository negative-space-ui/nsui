import { render, screen } from '@testing-library/react'
import React from 'react'

import { Field } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  })
}))

describe('Field', () => {
  it('should render field with default props', () => {
    render(
      <Field>
        <input />
      </Field>
    )

    const field = screen.getByRole('group')

    expect(field).toBeInTheDocument()
    expect(field).toHaveClass('ns-field')
  })

  it('should render label', () => {
    render(
      <Field label="Name">
        <input />
      </Field>
    )

    const label = screen.getByText('Name')

    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveClass('ns-label')
  })

  it('should pass label props', () => {
    render(
      <Field
        label="Email"
        labelProps={{
          htmlFor: 'email',
          title: 'email label'
        }}
      >
        <input id="email" />
      </Field>
    )

    const label = screen.getByText('Email')

    expect(label).toHaveAttribute('for', 'email')
    expect(label).toHaveAttribute('title', 'email label')
  })

  it('should render error message', () => {
    render(
      <Field error="Invalid email">
        <input />
      </Field>
    )

    const error = screen.getByText('Invalid email')
    const field = screen.getByRole('group')

    expect(error).toBeInTheDocument()
    expect(error.tagName).toBe('P')
    expect(error).toHaveClass('ns-text-error')
    expect(field).toHaveAttribute('data-error', 'true')
  })

  it('should not render error when error is not provided', () => {
    render(
      <Field>
        <input />
      </Field>
    )

    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument()
  })

  it('should apply custom classNames', () => {
    render(
      <Field
        classNames={{
          root: 'custom-root',
          label: 'custom-label',
          error: 'custom-error'
        }}
        label="Label"
        error="Error"
      >
        <input />
      </Field>
    )

    expect(screen.getByRole('group')).toHaveClass('custom-root')
    expect(screen.getByText('Label')).toHaveClass('custom-label')
    expect(screen.getByText('Error')).toHaveClass('custom-error')
  })

  it('should apply custom styles', () => {
    render(
      <Field
        label="Label"
        error="Error"
        styles={{
          root: {
            marginTop: 10
          },
          label: {
            fontWeight: 'bold'
          },
          error: {
            color: 'red'
          }
        }}
      >
        <input />
      </Field>
    )

    expect(screen.getByRole('group')).toHaveStyle({
      marginTop: '10px'
    })

    expect(screen.getByText('Label')).toHaveStyle({
      fontWeight: 'bold'
    })

    expect(screen.getByText('Error')).toHaveStyle({
      color: 'rgb(255, 0, 0)'
    })
  })

  it('should set error css variable by default', () => {
    render(
      <Field error="Error">
        <input />
      </Field>
    )

    expect(screen.getByText('Error')).toHaveStyle({
      color: 'var(--ns-error)'
    })
  })

  it('should pass native fieldset props', () => {
    render(
      <Field aria-label="User field">
        <input />
      </Field>
    )

    expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'User field')
  })

  it('should render children', () => {
    render(
      <Field>
        <input placeholder="Username" />
      </Field>
    )

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
  })
})
