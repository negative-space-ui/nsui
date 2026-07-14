import { render, screen } from '@testing-library/react'
import React from 'react'

import { CollectionGroup } from '..'

jest.mock('@negative-space/heading', () => ({
  Heading: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 data-testid="heading" {...props}>
      {children}
    </h2>
  )
}))

describe('CollectionGroup', () => {
  it('renders children', () => {
    render(<CollectionGroup>Item</CollectionGroup>)

    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('renders as group', () => {
    render(<CollectionGroup>Item</CollectionGroup>)

    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('renders heading when provided', () => {
    render(<CollectionGroup heading="Options">Item</CollectionGroup>)

    expect(screen.getByTestId('heading')).toHaveTextContent('Options')
  })

  it('links aria-labelledby to heading', () => {
    render(<CollectionGroup heading="Options">Item</CollectionGroup>)

    const group = screen.getByRole('group')
    const heading = screen.getByTestId('heading')

    expect(group).toHaveAttribute('aria-labelledby', heading.id)
  })

  it('does not set aria-labelledby without heading', () => {
    render(<CollectionGroup>Item</CollectionGroup>)

    expect(screen.getByRole('group')).not.toHaveAttribute('aria-labelledby')
  })

  it('applies classNames and styles', () => {
    render(
      <CollectionGroup
        heading="Options"
        classNames={{
          root: 'root-class',
          heading: 'heading-class'
        }}
        styles={{
          root: {
            display: 'flex'
          },
          heading: {
            fontSize: '20px'
          }
        }}
      >
        Item
      </CollectionGroup>
    )

    const group = screen.getByRole('group')
    const heading = screen.getByTestId('heading')

    expect(group).toHaveClass('root-class')
    expect(group).toHaveStyle({
      display: 'flex'
    })

    expect(heading).toHaveClass('heading-class')
    expect(heading).toHaveStyle({
      fontSize: '20px'
    })
  })
})
