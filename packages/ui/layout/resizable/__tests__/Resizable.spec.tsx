import { render, screen } from '@testing-library/react'
import React from 'react'

import { Resizable } from '..'

jest.mock('@negative-space/system', () => ({
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  }),
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
}))

describe('Resizable', () => {
  it('should render children', () => {
    render(
      <Resizable>
        <span>Content</span>
      </Resizable>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should apply default className', () => {
    render(<Resizable data-testid="resizable" />)

    expect(screen.getByTestId('resizable')).toHaveClass('ns-resizable')
  })

  it('should append custom className', () => {
    render(<Resizable data-testid="resizable" className="custom" />)

    expect(screen.getByTestId('resizable')).toHaveClass('ns-resizable', 'custom')
  })

  it('should pass props to Flex', () => {
    render(<Resizable data-testid="resizable" aria-label="container" />)

    expect(screen.getByTestId('resizable')).toHaveAttribute('aria-label', 'container')
  })

  it('should render with row direction by default', () => {
    render(<Resizable data-testid="resizable" />)

    expect(screen.getByTestId('resizable')).toBeInTheDocument()
  })

  it('should render with column direction', () => {
    render(<Resizable data-testid="resizable" direction="column" />)

    expect(screen.getByTestId('resizable')).toBeInTheDocument()
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Resizable ref={ref} />)

    expect(ref.current).toBeTruthy()
  })
})
