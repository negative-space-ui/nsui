import { Input } from '@negative-space/input'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Form } from '../src/Form'
import type { FormContextValue } from '../src/FormContext'
import { useFormState } from '../src/useFormState'

jest.mock('../src/useFormState')

const mockUseFormState = jest.mocked(useFormState)

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    },
    components: {
      form: {
        validationMode: 'onBlur',
        validationDelay: 0,
        disableSubmitOnError: true
      }
    }
  })
}))

jest.mock('@negative-space/grid', () => ({
  Grid: React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
    ({ children, ...props }, ref) => (
      <form ref={ref} data-testid="form" {...props}>
        {children}
      </form>
    )
  )
}))

function createContext(
  overrides: Partial<FormContextValue<Record<string, unknown>>> = {}
): FormContextValue<Record<string, unknown>> {
  return {
    values: {
      name: 'John'
    },

    errors: {},
    touched: {},

    validationMode: 'onBlur',
    validationDelay: 0,

    isSubmitting: false,
    isDirty: false,
    isValid: true,

    setValue: jest.fn(),
    setValues: jest.fn(),

    setError: jest.fn(),
    clearError: jest.fn(),
    clearErrors: jest.fn(),

    markTouched: jest.fn(),
    handleBlur: jest.fn(),

    reset: jest.fn(),
    submit: jest.fn(),

    ...overrides
  }
}

const initialValues = {
  name: 'John'
}

let ctx: FormContextValue<Record<string, unknown>>

beforeEach(() => {
  ctx = createContext()
  mockUseFormState.mockReturnValue(ctx)
})

describe('Form', () => {
  it('renders children', () => {
    render(
      <Form initialValues={initialValues} onSubmit={jest.fn()}>
        <div>content</div>
      </Form>
    )

    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('supports render prop', () => {
    render(
      <Form initialValues={initialValues} onSubmit={jest.fn()}>
        {(formCtx) => <span>{String(formCtx.values.name)}</span>}
      </Form>
    )

    expect(screen.getByText('John')).toBeInTheDocument()
  })

  it('calls submit', () => {
    render(
      <Form initialValues={initialValues} onSubmit={jest.fn()}>
        <button type="submit">Save</button>
      </Form>
    )

    fireEvent.submit(screen.getByTestId('form'))

    expect(ctx.submit).toHaveBeenCalledTimes(1)
  })

  it('injects value into input', () => {
    render(
      <Form initialValues={initialValues} onSubmit={jest.fn()}>
        <Input name="name" />
      </Form>
    )

    expect(screen.getByRole('textbox')).toHaveValue('John')
  })

  it('calls setValue on change', () => {
    render(
      <Form initialValues={initialValues} onSubmit={jest.fn()}>
        <Input name="name" />
      </Form>
    )

    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'Mary'
      }
    })

    expect(ctx.setValue).toHaveBeenCalledWith('name', 'Mary')
  })

  it('calls handleBlur', () => {
    render(
      <Form initialValues={initialValues} onSubmit={jest.fn()}>
        <Input name="name" />
      </Form>
    )

    fireEvent.blur(screen.getByRole('textbox'))

    expect(ctx.handleBlur).toHaveBeenCalledWith('name')
  })

  it('disables submit button when invalid', () => {
    ctx.isValid = false
    mockUseFormState.mockReturnValue(ctx)

    render(
      <Form initialValues={initialValues} onSubmit={jest.fn()}>
        <button type="submit">Save</button>
      </Form>
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not disable submit button when disableSubmitOnError is false', () => {
    ctx.isValid = false
    mockUseFormState.mockReturnValue(ctx)

    render(
      <Form initialValues={initialValues} onSubmit={jest.fn()} disableSubmitOnError={false}>
        <button type="submit">Save</button>
      </Form>
    )

    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('passes validation error to Input', () => {
    ctx.touched = { name: true }
    ctx.errors = { name: 'Required' }
    mockUseFormState.mockReturnValue(ctx)

    render(
      <Form initialValues={initialValues} onSubmit={jest.fn()}>
        <Input name="name" />
      </Form>
    )

    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})
