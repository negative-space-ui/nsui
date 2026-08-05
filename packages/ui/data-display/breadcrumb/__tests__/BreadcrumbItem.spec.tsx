import { render, screen } from '@testing-library/react'
import React from 'react'

import { BreadcrumbItem } from '../src/BreadcrumbItem'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  })
}))

jest.mock('@negative-space/flex', () => ({
  Flex: React.forwardRef(
    (
      {
        as: Component = 'div',
        children,
        className,
        style,
        ...props
      }: React.PropsWithChildren<{
        as?: React.ElementType
        className?: string
        style?: React.CSSProperties
      }>,
      ref: React.Ref<HTMLElement>
    ) => (
      <Component ref={ref} className={className} style={style} {...props}>
        {children}
      </Component>
    )
  )
}))

jest.mock('@negative-space/text', () => ({
  Text: React.forwardRef(
    (
      {
        children,
        className,
        style,
        ...props
      }: React.PropsWithChildren<{
        className?: string
        style?: React.CSSProperties
      }>,
      ref: React.Ref<HTMLSpanElement>
    ) => (
      <span ref={ref} className={className} style={style} {...props}>
        {children}
      </span>
    )
  )
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('BreadcrumbItem', () => {
  it('renders the label', () => {
    render(<BreadcrumbItem label="Home" />)

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders the prefix', () => {
    render(<BreadcrumbItem label="Home" prefix=">" />)

    expect(screen.getByText('>')).toBeInTheDocument()
  })

  it('applies the prefixed root class', () => {
    render(<BreadcrumbItem label="Home" />)

    const root = screen.getByText('Home').parentElement

    expect(root).toHaveClass('ns-breadcrumb-item')
  })

  it('applies custom root class', () => {
    render(<BreadcrumbItem label="Home" classNames={{ root: 'custom-root' }} />)

    const root = screen.getByText('Home').parentElement

    expect(root).toHaveClass('ns-breadcrumb-item', 'custom-root')
  })

  it('applies custom prefix class', () => {
    render(<BreadcrumbItem label="Home" prefix=">" classNames={{ prefix: 'custom-prefix' }} />)

    const prefix = screen.getByText('>', {
      selector: 'span'
    })

    expect(prefix).toHaveClass('ns-breadcrumb-item-prefix', 'custom-prefix')
  })

  it('applies custom label class', () => {
    render(<BreadcrumbItem label="Home" classNames={{ label: 'custom-label' }} />)

    expect(screen.getByText('Home')).toHaveClass('ns-breadcrumb-item-label', 'custom-label')
  })

  it('applies custom root styles', () => {
    render(<BreadcrumbItem label="Home" styles={{ root: { marginTop: '10px' } }} />)

    expect(screen.getByText('Home').parentElement).toHaveStyle({
      marginTop: '10px'
    })
  })

  it('applies custom prefix styles', () => {
    render(<BreadcrumbItem label="Home" prefix=">" styles={{ prefix: { marginRight: '8px' } }} />)

    const prefix = screen.getByText('>', {
      selector: 'span'
    })

    expect(prefix).toHaveStyle({
      marginRight: '8px'
    })
  })

  it('applies custom label styles', () => {
    render(<BreadcrumbItem label="Home" styles={{ label: { fontWeight: 'bold' } }} />)

    expect(screen.getByText('Home')).toHaveStyle({
      fontWeight: 'bold'
    })
  })

  it('renders as a link when href is provided', () => {
    render(<BreadcrumbItem label="Home" href="/home" />)

    const root = screen.getByText('Home').parentElement

    expect(root?.tagName).toBe('A')
    expect(root).toHaveAttribute('href', '/home')
  })

  it('does not render as a link when current is true', () => {
    render(<BreadcrumbItem label="Home" href="/home" current />)

    const root = screen.getByText('Home').parentElement

    expect(root?.tagName).toBe('DIV')
  })

  it('renders as a div when href is not provided', () => {
    render(<BreadcrumbItem label="Home" />)

    const root = screen.getByText('Home').parentElement

    expect(root?.tagName).toBe('DIV')
  })

  it('sets aria-current to page when current is true', () => {
    render(<BreadcrumbItem label="Home" current />)

    expect(screen.getByText('Home')).toHaveAttribute('aria-current', 'page')
  })

  it('does not set aria-current when current is false', () => {
    render(<BreadcrumbItem label="Home" current={false} />)

    expect(screen.getByText('Home')).not.toHaveAttribute('aria-current')
  })

  it('sets data-current to true when current is true', () => {
    render(<BreadcrumbItem label="Home" current />)

    expect(screen.getByText('Home')).toHaveAttribute('data-current', 'true')
  })

  it('does not set data-current when current is not provided', () => {
    render(<BreadcrumbItem label="Home" />)

    expect(screen.getByText('Home')).not.toHaveAttribute('data-current')
  })

  it('passes props to the root element', () => {
    render(
      <BreadcrumbItem label="Home" data-testid="breadcrumb-item" aria-label="Breadcrumb item" />
    )

    const root = screen.getByTestId('breadcrumb-item')

    expect(root).toHaveAttribute('aria-label', 'Breadcrumb item')
  })

  it('renders a React node as label', () => {
    render(<BreadcrumbItem label={<strong>Home</strong>} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Home').tagName).toBe('STRONG')
  })

  it('renders a React node as prefix', () => {
    render(<BreadcrumbItem label="Home" prefix={<span data-testid="prefix">/</span>} />)

    expect(screen.getByTestId('prefix')).toBeInTheDocument()
  })

  it('forwards the ref to the label', () => {
    const ref = React.createRef<HTMLSpanElement>()

    render(<BreadcrumbItem label="Home" ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    expect(ref.current).toHaveTextContent('Home')
  })

  it('renders as a div with href when current is true', () => {
    render(<BreadcrumbItem label="Home" href="/home" current />)

    const root = screen.getByText('Home').parentElement

    expect(root?.tagName).toBe('DIV')
    expect(root).toHaveAttribute('href', '/home')
  })

  it('preserves href when current is false', () => {
    render(<BreadcrumbItem label="Home" href="/home" current={false} />)

    const root = screen.getByText('Home').parentElement

    expect(root).toHaveAttribute('href', '/home')
  })
})
