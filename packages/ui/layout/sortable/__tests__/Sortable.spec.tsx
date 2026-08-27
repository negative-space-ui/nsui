import { render, screen } from '@testing-library/react'
import React from 'react'

import { Sortable } from '..'

jest.mock('@negative-space/system', () => ({
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  }),
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  mergeRefs:
    <T,>(...refs: Array<React.Ref<T> | undefined>) =>
    (node: T) => {
      refs.forEach((ref) => {
        if (!ref) return
        if (typeof ref === 'function') ref(node)
        else (ref as React.MutableRefObject<T>).current = node
      })
    },
  GripHorizontal: () => <svg data-testid="grip-horizontal" />,
  GripVertical: () => <svg data-testid="grip-vertical" />
}))

describe('Sortable', () => {
  it('should render children', () => {
    render(
      <Sortable>
        <span>Content</span>
      </Sortable>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should apply default className', () => {
    render(<Sortable data-testid="sortable" />)

    expect(screen.getByTestId('sortable')).toHaveClass('ns-sortable')
  })

  it('should apply custom root className via classNames prop', () => {
    render(<Sortable data-testid="sortable" classNames={{ root: 'custom' }} />)

    expect(screen.getByTestId('sortable')).toHaveClass('ns-sortable', 'custom')
  })

  it('should apply custom root style via styles prop', () => {
    render(<Sortable data-testid="sortable" styles={{ root: { backgroundColor: 'red' } }} />)

    expect(screen.getByTestId('sortable')).toHaveStyle({ backgroundColor: '#ff0000' })
  })

  it('should pass props to Flex', () => {
    render(<Sortable data-testid="sortable" aria-label="container" />)

    expect(screen.getByTestId('sortable')).toHaveAttribute('aria-label', 'container')
  })

  it('should render with column direction by default', () => {
    render(<Sortable data-testid="sortable" />)

    expect(screen.getByTestId('sortable')).toBeInTheDocument()
  })

  it('should render with row direction', () => {
    render(<Sortable data-testid="sortable" direction="row" />)

    expect(screen.getByTestId('sortable')).toBeInTheDocument()
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Sortable ref={ref} />)

    expect(ref.current).toBeTruthy()
  })
})
