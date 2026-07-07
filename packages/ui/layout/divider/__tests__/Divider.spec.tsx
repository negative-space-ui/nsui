import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Divider } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

describe('Divider', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)
  })

  it('should render divider with default orientation', () => {
    render(<Divider />)

    const divider = screen.getByRole('separator', { hidden: true })

    expect(divider).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('should render vertical orientation', () => {
    render(<Divider orientation="vertical" />)

    const divider = screen.getByRole('separator', { hidden: true })

    expect(divider).toHaveAttribute('data-orientation', 'vertical')
  })

  it('should apply default className', () => {
    render(<Divider />)

    const divider = screen.getByRole('separator', { hidden: true })

    expect(divider).toHaveClass('nsui-divider')
  })

  it('should append custom className', () => {
    render(<Divider className="custom-divider" />)

    const divider = screen.getByRole('separator', { hidden: true })

    expect(divider).toHaveClass('nsui-divider custom-divider')
  })

  it('should pass native props', () => {
    render(<Divider id="divider-test" title="Divider" />)

    const divider = screen.getByRole('separator', { hidden: true })

    expect(divider).toHaveAttribute('id', 'divider-test')
    expect(divider).toHaveAttribute('title', 'Divider')
  })

  it('should be hidden from accessibility tree', () => {
    render(<Divider />)

    const divider = screen.getByRole('separator', { hidden: true })

    expect(divider).toHaveAttribute('aria-hidden', 'true')
  })
})
