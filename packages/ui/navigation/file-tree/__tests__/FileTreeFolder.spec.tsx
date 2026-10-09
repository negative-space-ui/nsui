import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { FileTreeFolder } from '../src/FileTreeFolder'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  ChevronDown: () => <svg data-testid="chevron" />,
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

jest.mock('@negative-space/button', () => ({
  IconButton: React.forwardRef(
    (
      {
        children,
        classNames,
        styles,
        ...props
      }: React.PropsWithChildren<{
        classNames?: {
          root?: string
        }
        styles?: {
          root?: React.CSSProperties
        }
      }>,
      ref: React.Ref<HTMLButtonElement>
    ) => (
      <button ref={ref} className={classNames?.root} style={styles?.root} {...props}>
        {children}
      </button>
    )
  )
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('FileTreeFolder', () => {
  it('renders without children', () => {
    const { container } = render(<FileTreeFolder label="Folder" />)

    expect(container.querySelector('.ns-file-tree-folder')).toBeInTheDocument()
    expect(screen.getByText('Folder')).toBeInTheDocument()
  })

  it('renders children when expanded', () => {
    render(
      <FileTreeFolder label="Folder" collapsed={false}>
        <span>File 1</span>
      </FileTreeFolder>
    )

    expect(screen.getByText('File 1')).toBeInTheDocument()
  })

  it('does not render children when collapsed', () => {
    render(
      <FileTreeFolder label="Folder" collapsed>
        <span>File 1</span>
      </FileTreeFolder>
    )

    expect(screen.queryByText('File 1')).not.toBeInTheDocument()
  })

  it('applies the prefixed root class', () => {
    const { container } = render(<FileTreeFolder label="Folder" />)

    expect(container.querySelector('.ns-file-tree-folder')).toHaveClass('ns-file-tree-folder')
  })

  it('applies custom root class', () => {
    const { container } = render(
      <FileTreeFolder label="Folder" classNames={{ root: 'custom-root' }} />
    )

    expect(container.querySelector('.ns-file-tree-folder')).toHaveClass(
      'ns-file-tree-folder',
      'custom-root'
    )
  })

  it('applies custom root styles', () => {
    const { container } = render(
      <FileTreeFolder label="Folder" styles={{ root: { marginTop: '10px' } }} />
    )

    expect(container.querySelector('.ns-file-tree-folder')).toHaveStyle({
      marginTop: '10px'
    })
  })

  it('passes props to the root element', () => {
    render(<FileTreeFolder label="Folder" data-testid="folder" aria-label="Folder" />)

    expect(screen.getByTestId('folder')).toHaveAttribute('aria-label', 'Folder')
  })

  it('renders the collapse button by default', () => {
    render(<FileTreeFolder label="Folder" />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('chevron')).toBeInTheDocument()
  })

  it('does not render the collapse button when not collapsable', () => {
    render(<FileTreeFolder label="Folder" collapsable={false} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('starts collapsed by default', () => {
    render(
      <FileTreeFolder label="Folder">
        <span>File 1</span>
      </FileTreeFolder>
    )

    expect(screen.queryByText('File 1')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('data-collapsed', 'true')
  })

  it('starts expanded when collapsed is false', () => {
    render(
      <FileTreeFolder label="Folder" collapsed={false}>
        <span>File 1</span>
      </FileTreeFolder>
    )

    expect(screen.getByText('File 1')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('data-collapsed', 'false')
  })

  it('expands when clicking the collapse button', () => {
    render(
      <FileTreeFolder label="Folder">
        <span>File 1</span>
      </FileTreeFolder>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByText('File 1')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('data-collapsed', 'false')
  })

  it('collapses when clicking the collapse button while expanded', () => {
    render(
      <FileTreeFolder label="Folder" collapsed={false}>
        <span>File 1</span>
      </FileTreeFolder>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(screen.queryByText('File 1')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('data-collapsed', 'true')
  })

  it('calls setCollapsed when clicking the collapse button', () => {
    const setCollapsed = jest.fn()

    render(<FileTreeFolder label="Folder" collapsed setCollapsed={setCollapsed} />)

    fireEvent.click(screen.getByRole('button'))

    expect(setCollapsed).toHaveBeenCalledTimes(1)
    expect(setCollapsed).toHaveBeenCalledWith(false)
  })

  it('uses the controlled collapsed state', () => {
    const setCollapsed = jest.fn()

    const { rerender } = render(
      <FileTreeFolder label="Folder" collapsed setCollapsed={setCollapsed}>
        <span>File 1</span>
      </FileTreeFolder>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(setCollapsed).toHaveBeenCalledWith(false)
    expect(screen.queryByText('File 1')).not.toBeInTheDocument()

    rerender(
      <FileTreeFolder label="Folder" collapsed={false} setCollapsed={setCollapsed}>
        <span>File 1</span>
      </FileTreeFolder>
    )

    expect(screen.getByText('File 1')).toBeInTheDocument()
  })

  it('updates the internal state when collapsed changes', () => {
    const { rerender } = render(
      <FileTreeFolder label="Folder" collapsed>
        <span>File 1</span>
      </FileTreeFolder>
    )

    expect(screen.queryByText('File 1')).not.toBeInTheDocument()

    rerender(
      <FileTreeFolder label="Folder" collapsed={false}>
        <span>File 1</span>
      </FileTreeFolder>
    )

    expect(screen.getByText('File 1')).toBeInTheDocument()
  })

  it('applies custom header class and styles', () => {
    const { container } = render(
      <FileTreeFolder
        label="Folder"
        styles={{ header: { marginTop: '10px' } }}
        classNames={{ header: 'custom-header' }}
      />
    )

    const header = container.querySelector('.ns-file-tree-folder-header')

    expect(header).toHaveClass('ns-file-tree-folder-header', 'custom-header')
    expect(header).toHaveStyle({ marginTop: '10px' })
  })

  it('applies custom collapse button class and styles', () => {
    render(
      <FileTreeFolder
        label="Folder"
        classNames={{
          collapseButton: { root: 'custom-button' }
        }}
        styles={{
          collapseButton: { root: { marginTop: '10px' } }
        }}
      />
    )

    const button = screen.getByRole('button')

    expect(button).toHaveClass('custom-button')
    expect(button).toHaveStyle({ marginTop: '10px' })
  })

  it('applies custom prefix class and styles', () => {
    const { container } = render(
      <FileTreeFolder
        label="Folder"
        prefix=">"
        classNames={{ prefix: 'custom-prefix' }}
        styles={{ prefix: { marginRight: '5px' } }}
      />
    )

    const prefix = container.querySelector('.ns-file-tree-folder-prefix')

    expect(prefix).toHaveClass('ns-file-tree-folder-prefix', 'custom-prefix')
    expect(prefix).toHaveStyle({ marginRight: '5px' })
    expect(prefix).toHaveTextContent('>')
  })

  it('applies custom label class and styles', () => {
    const { container } = render(
      <FileTreeFolder
        label="Folder"
        classNames={{ label: 'custom-label' }}
        styles={{ label: { fontWeight: 'bold' } }}
      />
    )

    const label = container.querySelector('.ns-file-tree-folder-label')

    expect(label).toHaveClass('ns-file-tree-folder-label', 'custom-label')
    expect(label).toHaveStyle({ fontWeight: 'bold' })
  })

  it('applies custom suffix class and styles', () => {
    const { container } = render(
      <FileTreeFolder
        label="Folder"
        suffix="3"
        classNames={{ suffix: 'custom-suffix' }}
        styles={{ suffix: { marginLeft: '5px' } }}
      />
    )

    const suffix = container.querySelector('.ns-file-tree-folder-suffix')

    expect(suffix).toHaveClass('ns-file-tree-folder-suffix', 'custom-suffix')
    expect(suffix).toHaveStyle({ marginLeft: '5px' })
    expect(suffix).toHaveTextContent('3')
  })

  it('applies custom children class and styles', () => {
    const { container } = render(
      <FileTreeFolder
        label="Folder"
        collapsed={false}
        classNames={{ children: 'custom-children' }}
        styles={{ children: { marginTop: '10px' } }}
      >
        <span>File 1</span>
      </FileTreeFolder>
    )

    const children = container.querySelector('.ns-file-tree-folder-children')

    expect(children).toHaveClass('ns-file-tree-folder-children', 'custom-children')
    expect(children).toHaveStyle({ marginTop: '10px' })
    expect(children).toHaveTextContent('File 1')
  })

  it('does not render prefix when it is not provided', () => {
    const { container } = render(<FileTreeFolder label="Folder" />)

    expect(container.querySelector('.ns-file-tree-folder-prefix')).not.toBeInTheDocument()
  })

  it('does not render suffix when it is not provided', () => {
    const { container } = render(<FileTreeFolder label="Folder" />)

    expect(container.querySelector('.ns-file-tree-folder-suffix')).not.toBeInTheDocument()
  })

  it('forwards the ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<FileTreeFolder ref={ref} label="Folder" />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('ns-file-tree-folder-header')
  })

  it('renders React nodes as prefix, label and suffix', () => {
    render(
      <FileTreeFolder
        prefix={<strong>Prefix</strong>}
        label={<span>Folder</span>}
        suffix={<em>Suffix</em>}
      />
    )

    expect(screen.getByText('Prefix').tagName).toBe('STRONG')
    expect(screen.getByText('Folder').tagName).toBe('SPAN')
    expect(screen.getByText('Suffix').tagName).toBe('EM')
  })
})
