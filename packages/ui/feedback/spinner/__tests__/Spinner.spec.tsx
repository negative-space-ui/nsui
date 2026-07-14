import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Spinner } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

const mockedUseNSUI = useNSUI as jest.Mock

describe('Spinner', () => {
  beforeEach(() => {
    mockedUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders spinner when loading is true', () => {
    render(<Spinner />)

    const spinner = screen.getByRole('status')

    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-busy', 'true')
  })

  it('does not render when loading is false', () => {
    render(<Spinner loading={false} />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('applies default spinner class', () => {
    render(<Spinner />)

    expect(screen.getByRole('status')).toHaveClass('nsui-spinner')
  })

  it('merges custom className with spinner class', () => {
    render(<Spinner className="custom-class" />)

    expect(screen.getByRole('status')).toHaveClass('nsui-spinner', 'custom-class')
  })

  it('passes HTML attributes to the element', () => {
    render(<Spinner data-testid="spinner" id="test-spinner" />)

    const spinner = screen.getByTestId('spinner')

    expect(spinner).toHaveAttribute('id', 'test-spinner')
  })
})
