import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Flex } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

const mockedUseNSUI = useNSUI as jest.Mock

describe('Flex', () => {
  beforeEach(() => {
    mockedUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'ns'
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders with default props', () => {
    render(<Flex>Content</Flex>)

    const element = screen.getByText('Content')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('ns-flex')
    expect(element).toHaveStyle({
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: '0'
    })
  })

  it('applies custom flex styles', () => {
    render(
      <Flex
        direction="column"
        wrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        gap="16px"
      >
        Content
      </Flex>
    )

    const element = screen.getByText('Content')

    expect(element).toHaveStyle({
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    })
  })

  it('merges custom className', () => {
    render(<Flex className="custom">Content</Flex>)

    const element = screen.getByText('Content')

    expect(element).toHaveClass('ns-flex')
    expect(element).toHaveClass('custom')
  })

  it('merges custom style with default styles', () => {
    render(<Flex style={{ color: 'red', display: 'block' }}>Content</Flex>)

    const element = screen.getByText('Content')

    expect(element).toHaveStyle({
      display: 'block',
      color: 'rgb(255, 0, 0)'
    })
  })

  it('renders a custom element using as prop', () => {
    render(<Flex as="section">Content</Flex>)

    const element = screen.getByText('Content')

    expect(element.tagName).toBe('SECTION')
  })

  it('forwards props to the component', () => {
    render(
      <Flex data-testid="flex" id="container">
        Content
      </Flex>
    )

    const element = screen.getByTestId('flex')

    expect(element).toHaveAttribute('id', 'container')
  })

  it('calls useNSUI', () => {
    render(<Flex>Content</Flex>)

    expect(mockedUseNSUI).toHaveBeenCalledTimes(1)
  })
})
