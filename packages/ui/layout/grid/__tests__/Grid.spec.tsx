import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Grid } from '..'

jest.mock('@negative-space/system', () => ({
  ...jest.requireActual('@negative-space/system'),
  useNSUI: jest.fn(),
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
}))

describe('Grid', () => {
  beforeEach(() => {
    ;(useNSUI as jest.Mock).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    })
  })

  it('should render with default props', () => {
    render(
      <Grid>
        <span>Content</span>
      </Grid>
    )

    const grid = screen.getByText('Content').parentElement

    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('nsui-grid')
    expect(grid).toHaveStyle({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'repeat(1, 1fr)',
      alignItems: 'start',
      justifyItems: 'start',
      alignContent: 'start',
      justifyContent: 'start',
      gap: '0rem'
    })
  })

  it('should apply custom grid properties', () => {
    render(
      <Grid
        columns={4}
        rows={3}
        gap="16px"
        alignItems="center"
        justifyItems="end"
        alignContent="space-between"
        justifyContent="center"
      >
        Content
      </Grid>
    )

    const grid = screen.getByText('Content')

    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      gap: '16px',
      alignItems: 'center',
      justifyItems: 'end',
      alignContent: 'space-between',
      justifyContent: 'center'
    })
  })

  it('should render auto rows correctly', () => {
    render(<Grid rows="auto">Content</Grid>)

    expect(screen.getByText('Content')).toHaveStyle({
      gridTemplateRows: 'auto'
    })
  })

  it('should merge custom style with generated styles', () => {
    render(<Grid data-testid="grid">Content</Grid>)

    const grid = screen.getByTestId('grid')

    expect(grid).toHaveStyle({
      display: 'grid'
    })
  })

  it('should append custom className', () => {
    render(<Grid className="custom-grid">Content</Grid>)

    expect(screen.getByText('Content')).toHaveClass('nsui-grid', 'custom-grid')
  })

  it('should render a different element with as prop', () => {
    render(<Grid as="section">Content</Grid>)

    const grid = screen.getByText('Content')

    expect(grid.tagName).toBe('SECTION')
  })

  it('should pass native props', () => {
    render(
      <Grid data-testid="grid-test" aria-label="grid">
        Content
      </Grid>
    )

    const grid = screen.getByTestId('grid-test')

    expect(grid).toHaveAttribute('aria-label', 'grid')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Grid ref={ref}>Content</Grid>)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
