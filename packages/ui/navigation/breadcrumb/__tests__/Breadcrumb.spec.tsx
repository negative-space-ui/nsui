import { render, screen } from '@testing-library/react'
import React from 'react'

import { Breadcrumb } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    },
    components: {
      breadcrumb: {
        separator: '/'
      }
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

jest.mock('../src/BreadcrumbItem', () => ({
  BreadcrumbItem: React.forwardRef(
    (
      {
        label,
        prefix,
        current,
        href,
        classNames,
        styles,
        ...props
      }: {
        label: React.ReactNode
        prefix?: React.ReactNode
        current?: boolean
        href?: string
        classNames?: {
          root?: string
          prefix?: string
          label?: string
        }
        styles?: {
          root?: React.CSSProperties
          prefix?: React.CSSProperties
          label?: React.CSSProperties
        }
      },
      ref: React.Ref<HTMLSpanElement>
    ) => (
      <span
        ref={ref}
        data-testid="breadcrumb-item"
        data-current={current}
        data-href={href}
        data-root-class={classNames?.root}
        data-prefix-class={classNames?.prefix}
        data-label-class={classNames?.label}
        data-root-style={JSON.stringify(styles?.root)}
        data-prefix-style={JSON.stringify(styles?.prefix)}
        data-label-style={JSON.stringify(styles?.label)}
        {...props}
      >
        {prefix}
        {label}
      </span>
    )
  )
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Breadcrumb', () => {
  it('renders without items', () => {
    const { container } = render(<Breadcrumb />)

    expect(container.querySelector('.ns-breadcrumb')).toBeInTheDocument()
  })

  it('renders all items', () => {
    render(<Breadcrumb items={[{ label: 'Home' }, { label: 'Products' }, { label: 'Details' }]} />)

    expect(screen.getAllByTestId('breadcrumb-item')).toHaveLength(3)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('applies the prefixed root class', () => {
    const { container } = render(<Breadcrumb />)

    expect(container.querySelector('.ns-breadcrumb')).toHaveClass('ns-breadcrumb')
  })

  it('applies custom root class', () => {
    const { container } = render(<Breadcrumb classNames={{ root: 'custom-root' }} />)

    expect(container.querySelector('.ns-breadcrumb')).toHaveClass('ns-breadcrumb', 'custom-root')
  })

  it('applies custom root styles', () => {
    const { container } = render(<Breadcrumb styles={{ root: { marginTop: '10px' } }} />)

    expect(container.querySelector('.ns-breadcrumb')).toHaveStyle({
      marginTop: '10px'
    })
  })

  it('passes props to the root element', () => {
    render(<Breadcrumb data-testid="breadcrumb" aria-label="Breadcrumb" />)

    const root = screen.getByTestId('breadcrumb')

    expect(root).toHaveAttribute('aria-label', 'Breadcrumb')
  })

  it('renders the separator from the provider', () => {
    render(<Breadcrumb items={[{ label: 'Home' }, { label: 'Products' }]} />)

    expect(screen.getByText('/')).toBeInTheDocument()
  })

  it('uses the explicit separator instead of the provider separator', () => {
    render(<Breadcrumb separator=">" items={[{ label: 'Home' }, { label: 'Products' }]} />)

    expect(screen.getByText('>')).toBeInTheDocument()
    expect(screen.queryByText('/')).not.toBeInTheDocument()
  })

  it('does not render a separator for the first item', () => {
    render(<Breadcrumb items={[{ label: 'Home' }]} />)

    expect(screen.queryByText('/')).not.toBeInTheDocument()
  })

  it('renders separators only between items', () => {
    render(<Breadcrumb items={[{ label: 'Home' }, { label: 'Products' }, { label: 'Details' }]} />)

    expect(screen.getAllByText('/')).toHaveLength(2)
  })

  it('applies the prefixed separator class', () => {
    render(<Breadcrumb items={[{ label: 'Home' }, { label: 'Products' }]} />)

    expect(screen.getByText('/')).toHaveClass('ns-breadcrumb-separator')
  })

  it('applies custom separator class', () => {
    render(
      <Breadcrumb
        classNames={{ separator: 'custom-separator' }}
        items={[{ label: 'Home' }, { label: 'Products' }]}
      />
    )

    expect(screen.getByText('/')).toHaveClass('ns-breadcrumb-separator', 'custom-separator')
  })

  it('applies custom separator styles', () => {
    render(
      <Breadcrumb
        styles={{
          separator: { marginInline: '8px' }
        }}
        items={[{ label: 'Home' }, { label: 'Products' }]}
      />
    )

    expect(screen.getByText('/')).toHaveStyle({
      marginInline: '8px'
    })
  })

  it('sets aria-hidden on separators', () => {
    render(<Breadcrumb items={[{ label: 'Home' }, { label: 'Products' }]} />)

    expect(screen.getByText('/')).toHaveAttribute('aria-hidden', 'true')
  })

  it('marks only the last item as current', () => {
    render(<Breadcrumb items={[{ label: 'Home' }, { label: 'Products' }, { label: 'Details' }]} />)

    const items = screen.getAllByTestId('breadcrumb-item')

    expect(items[0]).toHaveAttribute('data-current', 'false')
    expect(items[1]).toHaveAttribute('data-current', 'false')
    expect(items[2]).toHaveAttribute('data-current', 'true')
  })

  it('passes item props to BreadcrumbItem', () => {
    render(
      <Breadcrumb
        items={[
          {
            label: 'Home',
            href: '/home',
            prefix: '>'
          }
        ]}
      />
    )

    const item = screen.getByTestId('breadcrumb-item')

    expect(item).toHaveAttribute('data-href', '/home')
    expect(item).toHaveTextContent('>')
    expect(item).toHaveTextContent('Home')
  })

  it('passes item classNames to BreadcrumbItem', () => {
    render(
      <Breadcrumb
        classNames={{
          items: {
            root: 'item-root',
            prefix: 'item-prefix',
            label: 'item-label'
          }
        }}
        items={[{ label: 'Home' }, { label: 'Products' }]}
      />
    )

    const items = screen.getAllByTestId('breadcrumb-item')

    expect(items[0]).toHaveAttribute('data-root-class', 'item-root')

    expect(items[0]).toHaveAttribute('data-prefix-class', 'item-prefix')

    expect(items[0]).toHaveAttribute('data-label-class', 'item-label')
  })

  it('passes item styles to BreadcrumbItem', () => {
    render(
      <Breadcrumb
        styles={{
          items: {
            root: { marginTop: '10px' },
            prefix: { marginRight: '5px' },
            label: { fontWeight: 'bold' }
          }
        }}
        items={[{ label: 'Home' }, { label: 'Products' }]}
      />
    )

    const items = screen.getAllByTestId('breadcrumb-item')

    expect(items[0]).toHaveAttribute('data-root-style', JSON.stringify({ marginTop: '10px' }))

    expect(items[0]).toHaveAttribute('data-prefix-style', JSON.stringify({ marginRight: '5px' }))

    expect(items[0]).toHaveAttribute('data-label-style', JSON.stringify({ fontWeight: 'bold' }))
  })

  it('forwards the ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Breadcrumb ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('ns-breadcrumb')
  })

  it('renders a React node as separator', () => {
    render(
      <Breadcrumb
        separator={<span data-testid="separator">→</span>}
        items={[{ label: 'Home' }, { label: 'Products' }]}
      />
    )

    expect(screen.getByTestId('separator')).toBeInTheDocument()
  })

  it('renders a React node as an item label', () => {
    render(<Breadcrumb items={[{ label: <strong>Home</strong> }]} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Home').tagName).toBe('STRONG')
  })
})
