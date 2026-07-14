import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Switch } from '../src/Switch'

const mockUseNSUI = jest.fn()

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),

  useNSUI: () => mockUseNSUI()
}))

jest.mock('@negative-space/field', () => ({
  Field: ({ children }: React.PropsWithChildren) => <div data-testid="field">{children}</div>
}))

describe('Switch', () => {
  beforeEach(() => {
    mockUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'ns'
      }
    })
  })

  it('should render correctly', () => {
    render(<Switch />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('data-checked', 'false')

    expect(document.querySelector('.ns-switch-inner')).toBeInTheDocument()
  })

  it('should render checked state', () => {
    render(<Switch checked />)

    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('data-checked', 'true')
  })

  it('should call onChange with next value', () => {
    const onChange = jest.fn()

    render(<Switch onChange={onChange} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('should call onChange false when checked', () => {
    const onChange = jest.fn()

    render(<Switch checked onChange={onChange} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('should not fail without onChange', () => {
    render(<Switch />)

    expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow()
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLButtonElement>()

    render(<Switch ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('should apply custom classes', () => {
    render(
      <Switch
        classNames={{
          root: 'custom-root',
          inner: 'custom-inner',
          field: {
            root: 'custom-field'
          }
        }}
      />
    )

    expect(screen.getByRole('button')).toHaveClass('custom-root')

    expect(document.querySelector('.custom-inner')).toBeInTheDocument()
  })

  it('should apply custom styles', () => {
    render(
      <Switch
        styles={{
          root: {
            backgroundColor: 'red'
          },
          inner: {
            width: '20px'
          }
        }}
      />
    )

    expect(screen.getByRole('button')).toHaveStyle({
      backgroundColor: 'rgb(255, 0, 0)'
    })

    expect(document.querySelector('.ns-switch-inner')).toHaveStyle({
      width: '20px'
    })
  })

  it('should pass button props', () => {
    render(<Switch aria-label="toggle" disabled />)

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-label', 'toggle')
  })

  it('should render inside field', () => {
    render(<Switch />)

    expect(screen.getByTestId('field')).toBeInTheDocument()
  })

  it('should apply transform when checked', () => {
    render(<Switch checked />)

    const inner = document.querySelector('.ns-switch-inner')

    expect(inner).toBeInTheDocument()

    expect(inner).toHaveStyle('transform: translateX(-12px)')
  })
})
