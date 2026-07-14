import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Heading } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

const mockedUseNSUI = useNSUI as jest.Mock

describe('Heading', () => {
  beforeEach(() => {
    mockedUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'nsui'
      },
      components: {
        heading: {
          typeElement: 'h1'
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders heading with default element', () => {
    render(<Heading>Hello World</Heading>)

    const heading = screen.getByText('Hello World')

    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })

  it('renders custom heading element', () => {
    render(<Heading as="h3">Custom Heading</Heading>)

    const heading = screen.getByText('Custom Heading')

    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H3')
  })

  it('applies default heading class', () => {
    render(<Heading>Heading</Heading>)

    expect(screen.getByText('Heading')).toHaveClass('nsui-heading')
  })

  it('merges custom className with heading class', () => {
    render(<Heading className="custom-class">Heading</Heading>)

    expect(screen.getByText('Heading')).toHaveClass('nsui-heading', 'custom-class')
  })

  it('passes HTML attributes to the element', () => {
    render(
      <Heading id="heading-id" data-testid="heading">
        Heading
      </Heading>
    )

    const heading = screen.getByTestId('heading')

    expect(heading).toHaveAttribute('id', 'heading-id')
  })

  it('uses configured heading element from NSUI context', () => {
    mockedUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'nsui'
      },
      components: {
        heading: {
          typeElement: 'h2'
        }
      }
    })

    render(<Heading>Heading</Heading>)

    expect(screen.getByText('Heading').tagName).toBe('H2')
  })
})
