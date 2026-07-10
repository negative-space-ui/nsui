import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Surface } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

describe('Surface', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)
  })

  it('should render with the global prefix class', () => {
    render(<Surface data-testid="surface" />)

    const surface = screen.getByTestId('surface')

    expect(surface).toHaveClass('nsui-surface')
  })

  it('should merge custom className', () => {
    render(<Surface className="custom-class" data-testid="surface" />)

    const surface = screen.getByTestId('surface')

    expect(surface).toHaveClass('nsui-surface')
    expect(surface).toHaveClass('custom-class')
  })

  it('should forward HTML props', () => {
    render(<Surface id="my-surface" aria-label="Surface" />)

    const surface = screen.getByLabelText('Surface')

    expect(surface).toHaveAttribute('id', 'my-surface')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Surface ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
