import { render, screen } from '@testing-library/react'
import React from 'react'

import { FileTreeItem } from '../src/FileTreeItem'

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

beforeEach(() => {
  jest.clearAllMocks()
})

describe('FileTreeItem', () => {
  it('renders without prefix or suffix', () => {
    const { container } = render(<FileTreeItem label="File" />)

    expect(container.querySelector('.ns-file-tree-item')).toBeInTheDocument()
    expect(screen.getByText('File')).toBeInTheDocument()
    expect(container.querySelector('.ns-file-tree-item-prefix')).not.toBeInTheDocument()
    expect(container.querySelector('.ns-file-tree-item-suffix')).not.toBeInTheDocument()
  })

  it('renders prefix', () => {
    render(<FileTreeItem label="File" prefix=">" />)

    expect(screen.getByText('>')).toBeInTheDocument()
  })

  it('renders suffix', () => {
    render(<FileTreeItem label="File" suffix="3" />)

    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders prefix, label and suffix', () => {
    render(<FileTreeItem prefix=">" label="File" suffix="3" />)

    expect(screen.getByText('>')).toBeInTheDocument()
    expect(screen.getByText('File')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('applies the prefixed root class', () => {
    const { container } = render(<FileTreeItem label="File" />)

    expect(container.querySelector('.ns-file-tree-item')).toHaveClass('ns-file-tree-item')
  })

  it('applies custom root class', () => {
    const { container } = render(<FileTreeItem label="File" classNames={{ root: 'custom-root' }} />)

    expect(container.querySelector('.ns-file-tree-item')).toHaveClass(
      'ns-file-tree-item',
      'custom-root'
    )
  })

  it('applies custom root styles', () => {
    const { container } = render(
      <FileTreeItem label="File" styles={{ root: { marginTop: '10px' } }} />
    )

    expect(container.querySelector('.ns-file-tree-item')).toHaveStyle({
      marginTop: '10px'
    })
  })

  it('passes props to the root element', () => {
    render(<FileTreeItem label="File" data-testid="file-item" aria-label="File" />)

    expect(screen.getByTestId('file-item')).toHaveAttribute('aria-label', 'File')
  })

  it('applies custom prefix class and styles', () => {
    const { container } = render(
      <FileTreeItem
        label="File"
        prefix=">"
        classNames={{ prefix: 'custom-prefix' }}
        styles={{ prefix: { marginRight: '5px' } }}
      />
    )

    const prefix = container.querySelector('.ns-file-tree-item-prefix')

    expect(prefix).toHaveClass('ns-file-tree-item-prefix', 'custom-prefix')
    expect(prefix).toHaveStyle({ marginRight: '5px' })
    expect(prefix).toHaveTextContent('>')
  })

  it('applies custom label class and styles', () => {
    const { container } = render(
      <FileTreeItem
        label="File"
        classNames={{ label: 'custom-label' }}
        styles={{ label: { fontWeight: 'bold' } }}
      />
    )

    const label = container.querySelector('.ns-file-tree-item-label')

    expect(label).toHaveClass('ns-file-tree-item-label', 'custom-label')
    expect(label).toHaveStyle({ fontWeight: 'bold' })
    expect(label).toHaveTextContent('File')
  })

  it('applies custom suffix class and styles', () => {
    const { container } = render(
      <FileTreeItem
        label="File"
        suffix="3"
        classNames={{ suffix: 'custom-suffix' }}
        styles={{ suffix: { marginLeft: '5px' } }}
      />
    )

    const suffix = container.querySelector('.ns-file-tree-item-suffix')

    expect(suffix).toHaveClass('ns-file-tree-item-suffix', 'custom-suffix')
    expect(suffix).toHaveStyle({ marginLeft: '5px' })
    expect(suffix).toHaveTextContent('3')
  })

  it('forwards the ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<FileTreeItem ref={ref} label="File" />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('ns-file-tree-item')
  })

  it('renders React nodes as prefix, label and suffix', () => {
    render(
      <FileTreeItem
        prefix={<strong>Prefix</strong>}
        label={<span>File</span>}
        suffix={<em>Suffix</em>}
      />
    )

    expect(screen.getByText('Prefix').tagName).toBe('STRONG')
    expect(screen.getByText('File').tagName).toBe('SPAN')
    expect(screen.getByText('Suffix').tagName).toBe('EM')
  })
})
