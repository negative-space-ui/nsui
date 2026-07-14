import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Input } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  })
}))

jest.mock('@negative-space/field', () => ({
  Field: ({ children }: React.PropsWithChildren) => <div data-testid="field">{children}</div>
}))

jest.mock('@negative-space/flex', () => ({
  Flex: ({
    children,
    className,
    style
  }: React.PropsWithChildren<{
    className?: string
    style?: React.CSSProperties
  }>) => (
    <div data-testid="flex" className={className} style={style}>
      {children}
    </div>
  )
}))

jest.mock('@negative-space/spinner', () => ({
  Spinner: ({
    loading,
    ...props
  }: {
    loading?: boolean
    className?: string
    style?: React.CSSProperties
  }) => (
    <div data-testid="spinner" data-loading={loading} {...props}>
      spinner
    </div>
  )
}))

describe('Input', () => {
  it('should render correctly', () => {
    render(<Input placeholder="Name" />)

    const input = screen.getByPlaceholderText('Name')

    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('ns-input-content')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>()

    render(<Input ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should use provided id', () => {
    render(<Input id="my-input" />)

    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-input')
  })

  it('should generate id when no id is provided', () => {
    render(<Input />)

    expect(screen.getByRole('textbox')).toHaveAttribute('id')
  })

  it('should call onChange', () => {
    const onChange = jest.fn()

    render(<Input onChange={onChange} />)

    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'hello'
      }
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].target.value).toBe('hello')
  })

  it('should apply mask on change', () => {
    const onChange = jest.fn()

    render(<Input mask={(value) => value.replace(/\D/g, '')} onChange={onChange} />)

    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'abc123'
      }
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].target.value).toBe('123')
  })

  it('should disable input when disabled', () => {
    render(<Input disabled />)

    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('should disable input when loading', () => {
    render(<Input loading />)

    const input = screen.getByRole('textbox')

    expect(input).toBeDisabled()
    expect(input).toHaveAttribute('data-loading', 'true')
  })

  it('should render prefix', () => {
    render(<Input prefix={<span>prefix</span>} />)

    expect(screen.getByText('prefix')).toBeInTheDocument()
    expect(document.querySelector('.ns-input-prefix')).toBeTruthy()
  })

  it('should render suffix', () => {
    render(<Input suffix={<span>suffix</span>} />)

    expect(screen.getByText('suffix')).toBeInTheDocument()
    expect(document.querySelector('.ns-input-suffix')).toBeTruthy()
  })

  it('should render spinner on suffix when loading', () => {
    render(<Input loading spinnerPosition="suffix" />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('should render spinner on prefix when loading', () => {
    render(<Input loading spinnerPosition="prefix" />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('should call onPaste without mask', () => {
    const onPaste = jest.fn()

    render(<Input onPaste={onPaste} />)

    fireEvent.paste(screen.getByRole('textbox'), {
      clipboardData: {
        getData: () => 'test'
      }
    })

    expect(onPaste).toHaveBeenCalledTimes(1)
  })

  it('should handle paste with mask', () => {
    const onPaste = jest.fn()

    render(<Input mask={(value) => value.toUpperCase()} onPaste={onPaste} />)

    fireEvent.paste(screen.getByRole('textbox'), {
      clipboardData: {
        getData: () => 'hello'
      }
    })

    expect(onPaste).toHaveBeenCalledTimes(1)
  })

  it('should apply custom classes', () => {
    render(
      <Input
        classNames={{
          root: 'custom-root',
          content: 'custom-content',
          prefix: 'custom-prefix',
          suffix: 'custom-suffix',
          spinner: 'custom-spinner'
        }}
        prefix="P"
        suffix="S"
        loading
      />
    )

    expect(screen.getByRole('textbox')).toHaveClass('custom-content')
    expect(document.querySelector('.custom-root')).toBeTruthy()
    expect(document.querySelector('.custom-prefix')).toBeTruthy()
    expect(document.querySelector('.custom-suffix')).toBeTruthy()
  })

  it('should apply custom styles', () => {
    render(
      <Input
        styles={{
          root: {
            backgroundColor: 'red'
          },
          content: {
            color: 'blue'
          }
        }}
      />
    )

    expect(screen.getByRole('textbox')).toHaveStyle({
      color: 'rgb(0, 0, 255)'
    })
  })

  it('should pass input props', () => {
    render(<Input name="email" type="email" />)

    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('name', 'email')
    expect(input).toHaveAttribute('type', 'email')
  })
})
