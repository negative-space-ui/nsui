import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { ListItem } from '../src/ListItem'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

describe('ListItem', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)
  })

  it('should render with the correct class', () => {
    render(<ListItem>Item</ListItem>)

    const item = screen.getByText('Item')

    expect(item).toHaveClass('nsui-list-item')
  })

  it('should render children', () => {
    render(<ListItem>List content</ListItem>)

    expect(screen.getByText('List content')).toBeInTheDocument()
  })

  it('should merge custom className', () => {
    render(<ListItem className="custom-class">Item</ListItem>)

    expect(screen.getByText('Item')).toHaveClass('nsui-list-item')
    expect(screen.getByText('Item')).toHaveClass('custom-class')
  })

  it('should forward html props', () => {
    render(<ListItem aria-label="list item">Item</ListItem>)

    expect(screen.getByLabelText('list item')).toBeInTheDocument()
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLLIElement>()

    render(<ListItem ref={ref}>Item</ListItem>)

    expect(ref.current).toBeInstanceOf(HTMLLIElement)
  })
})
