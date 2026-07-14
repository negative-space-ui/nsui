import { render, screen } from '@testing-library/react'
import React from 'react'

import { Skeleton } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'nsui'
    }
  })
}))

describe('Skeleton', () => {
  it('renders with default classes', () => {
    render(<Skeleton data-testid="skeleton" />)

    const skeleton = screen.getByTestId('skeleton')

    expect(skeleton).toHaveClass('nsui-skeleton')
    expect(skeleton).toHaveClass('nsui-pulse')
  })

  it('merges custom className', () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />)

    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class')
  })

  it('passes HTML attributes', () => {
    render(<Skeleton aria-label="loading content" id="my-skeleton" data-testid="skeleton" />)

    const skeleton = screen.getByTestId('skeleton')

    expect(skeleton).toHaveAttribute('aria-label', 'loading content')
    expect(skeleton).toHaveAttribute('id', 'my-skeleton')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Skeleton ref={ref} data-testid="skeleton" />)

    expect(ref.current).toBe(screen.getByTestId('skeleton'))
  })
})
