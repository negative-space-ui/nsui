import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Info } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

jest.mock('@negative-space/heading', () => ({
  Heading: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props}>{children}</h1>
  )
}))

jest.mock('@negative-space/text', () => ({
  Text: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span {...props}>{children}</span>
  )
}))

const mockedUseNSUI = useNSUI as jest.Mock

describe('Info', () => {
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

  it('renders info with heading and description', () => {
    render(<Info heading="Title" description="Description" />)

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('does not render heading when heading is not provided', () => {
    render(<Info description="Description" />)

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('does not render description when description is not provided', () => {
    render(<Info heading="Title" />)

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.queryByText('Description')).not.toBeInTheDocument()
  })

  it('applies default info class', () => {
    render(<Info heading="Title" />)

    expect(screen.getByText('Title').parentElement).toHaveClass('nsui-info')
  })

  it('applies custom classes', () => {
    render(
      <Info
        heading="Title"
        description="Description"
        classNames={{
          root: 'root-class',
          heading: 'heading-class',
          description: 'description-class'
        }}
      />
    )

    expect(screen.getByText('Title').parentElement).toHaveClass('root-class')
    expect(screen.getByText('Title')).toHaveClass('heading-class')
    expect(screen.getByText('Description')).toHaveClass('description-class')
  })

  it('applies custom styles', () => {
    render(
      <Info
        heading="Title"
        description="Description"
        styles={{
          root: { marginTop: '10px' },
          heading: { fontSize: '20px' },
          description: { opacity: 0.5 }
        }}
      />
    )

    expect(screen.getByText('Title').parentElement).toHaveStyle({
      marginTop: '10px'
    })

    expect(screen.getByText('Title')).toHaveStyle({
      fontSize: '20px'
    })

    expect(screen.getByText('Description')).toHaveStyle({
      opacity: 0.5
    })
  })

  it('passes HTML attributes to root element', () => {
    render(<Info heading="Title" data-testid="info" />)

    expect(screen.getByTestId('info')).toBeInTheDocument()
  })
})
