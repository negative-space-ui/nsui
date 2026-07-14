import { render, screen } from '@testing-library/react'
import React from 'react'

import { Checkmark } from '../src/Checkmark'

const mockUseNSUI = jest.fn()

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),

  Check: React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
    ({ children, ...props }, ref) => (
      <svg ref={ref} data-testid="check" {...props}>
        {children}
      </svg>
    )
  ),

  useNSUI: () => mockUseNSUI()
}))

describe('Checkmark', () => {
  beforeEach(() => {
    mockUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'ns'
      },
      components: {
        checkmark: {
          animation: 'fade'
        }
      }
    })
  })

  it('should render correctly', () => {
    render(<Checkmark />)

    const check = screen.getByTestId('check')

    expect(check).toBeInTheDocument()
    expect(check).toHaveClass('ns-checkmark')
  })

  it('should render unchecked by default', () => {
    render(<Checkmark />)

    expect(screen.getByTestId('check')).toHaveAttribute('data-visible', 'false')
  })

  it('should render checked state', () => {
    render(<Checkmark checked />)

    expect(screen.getByTestId('check')).toHaveAttribute('data-visible', 'true')
  })

  it('should apply default animation class', () => {
    render(<Checkmark />)

    expect(screen.getByTestId('check')).toHaveClass('ns-fade')
  })

  it('should apply custom animation', () => {
    render(<Checkmark animation="pop" />)

    expect(screen.getByTestId('check')).toHaveClass('ns-pop')
  })

  it('should not apply animation class when none', () => {
    render(<Checkmark animation="none" />)

    const check = screen.getByTestId('check')

    expect(check).toHaveClass('ns-checkmark')

    expect(check).not.toHaveClass('ns-none')
  })

  it('should apply custom className', () => {
    render(<Checkmark className="custom-check" />)

    expect(screen.getByTestId('check')).toHaveClass('custom-check')
  })

  it('should forward ref', () => {
    const ref = React.createRef<SVGSVGElement>()

    render(<Checkmark ref={ref} />)

    expect(ref.current).toBeInstanceOf(SVGSVGElement)
  })

  it('should pass svg props', () => {
    render(<Checkmark aria-label="check icon" width={24} height={24} />)

    const check = screen.getByTestId('check')

    expect(check).toHaveAttribute('aria-label', 'check icon')

    expect(check).toHaveAttribute('width', '24')

    expect(check).toHaveAttribute('height', '24')
  })
})
