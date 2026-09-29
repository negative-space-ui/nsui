import { render, screen } from '@testing-library/react'
import React from 'react'

import { FileTree } from '..'

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

jest.mock('../src/FileTreeFolder', () => ({
  FileTreeFolder: React.forwardRef(
    (
      {
        label,
        children,
        classNames,
        styles,
        ...props
      }: React.PropsWithChildren<{
        label: React.ReactNode
        classNames?: {
          root?: string
          label?: string
        }
        styles?: {
          root?: React.CSSProperties
          label?: React.CSSProperties
        }
      }>,
      ref: React.Ref<HTMLDivElement>
    ) => (
      <div
        ref={ref}
        data-testid="file-tree-folder"
        data-root-class={classNames?.root}
        data-label-class={classNames?.label}
        data-root-style={JSON.stringify(styles?.root)}
        data-label-style={JSON.stringify(styles?.label)}
        {...props}
      >
        <span>{label}</span>
        {children}
      </div>
    )
  )
}))

jest.mock('../src/FileTreeItem', () => ({
  FileTreeItem: React.forwardRef(
    (
      {
        label,
        classNames,
        styles,
        ...props
      }: {
        label: React.ReactNode
        classNames?: {
          root?: string
          label?: string
        }
        styles?: {
          root?: React.CSSProperties
          label?: React.CSSProperties
        }
      },
      ref: React.Ref<HTMLDivElement>
    ) => (
      <div
        ref={ref}
        data-testid="file-tree-item"
        data-root-class={classNames?.root}
        data-label-class={classNames?.label}
        data-root-style={JSON.stringify(styles?.root)}
        data-label-style={JSON.stringify(styles?.label)}
        {...props}
      >
        {label}
      </div>
    )
  )
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('FileTree', () => {
  it('renders without items', () => {
    const { container } = render(<FileTree />)

    expect(container.querySelector('.ns-file-tree')).toBeInTheDocument()
  })

  it('renders all items', () => {
    render(
      <FileTree
        items={[
          { item: { label: 'File 1' } },
          { item: { label: 'File 2' } },
          { item: { label: 'File 3' } }
        ]}
      />
    )

    expect(screen.getAllByTestId('file-tree-item')).toHaveLength(3)
    expect(screen.getByText('File 1')).toBeInTheDocument()
    expect(screen.getByText('File 2')).toBeInTheDocument()
    expect(screen.getByText('File 3')).toBeInTheDocument()
  })

  it('renders all folders', () => {
    render(
      <FileTree
        items={[
          { folder: { label: 'Folder 1' } },
          { folder: { label: 'Folder 2' } },
          { folder: { label: 'Folder 3' } }
        ]}
      />
    )

    expect(screen.getAllByTestId('file-tree-folder')).toHaveLength(3)
    expect(screen.getByText('Folder 1')).toBeInTheDocument()
    expect(screen.getByText('Folder 2')).toBeInTheDocument()
    expect(screen.getByText('Folder 3')).toBeInTheDocument()
  })

  it('renders nested folders and items', () => {
    render(
      <FileTree
        items={[
          {
            folder: { label: 'Folder 1' },
            items: [
              { item: { label: 'File 1' } },
              {
                folder: { label: 'Folder 2' },
                items: [{ item: { label: 'File 2' } }]
              }
            ]
          }
        ]}
      />
    )

    expect(screen.getAllByTestId('file-tree-folder')).toHaveLength(2)
    expect(screen.getAllByTestId('file-tree-item')).toHaveLength(2)

    expect(screen.getByText('Folder 1')).toBeInTheDocument()
    expect(screen.getByText('Folder 2')).toBeInTheDocument()
    expect(screen.getByText('File 1')).toBeInTheDocument()
    expect(screen.getByText('File 2')).toBeInTheDocument()

    const folders = screen.getAllByTestId('file-tree-folder')
    const items = screen.getAllByTestId('file-tree-item')

    expect(folders[0]).toContainElement(items[0])
    expect(folders[0]).toContainElement(folders[1])
    expect(folders[1]).toContainElement(items[1])
  })

  it('applies the prefixed root class', () => {
    const { container } = render(<FileTree />)

    expect(container.querySelector('.ns-file-tree')).toHaveClass('ns-file-tree')
  })

  it('applies custom root class', () => {
    const { container } = render(<FileTree classNames={{ root: 'custom-root' }} />)

    expect(container.querySelector('.ns-file-tree')).toHaveClass('ns-file-tree', 'custom-root')
  })

  it('applies custom root styles', () => {
    const { container } = render(<FileTree styles={{ root: { marginTop: '10px' } }} />)

    expect(container.querySelector('.ns-file-tree')).toHaveStyle({
      marginTop: '10px'
    })
  })

  it('passes props to the root element', () => {
    render(<FileTree data-testid="file-tree" aria-label="File tree" />)

    const root = screen.getByTestId('file-tree')

    expect(root).toHaveAttribute('aria-label', 'File tree')
  })

  it('passes item props to FileTreeItem', () => {
    render(
      <FileTree
        items={[
          {
            item: {
              label: 'File 1'
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('file-tree-item')).toHaveTextContent('File 1')
  })

  it('passes folder props to FileTreeFolder', () => {
    render(
      <FileTree
        items={[
          {
            folder: {
              label: 'Folder 1'
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('file-tree-folder')).toHaveTextContent('Folder 1')
  })

  it('passes custom item classNames', () => {
    render(
      <FileTree
        classNames={{
          items: {
            root: 'item-root',
            label: 'item-label'
          }
        }}
        items={[{ item: { label: 'File 1' } }]}
      />
    )

    const item = screen.getByTestId('file-tree-item')

    expect(item).toHaveAttribute('data-root-class', 'item-root')
    expect(item).toHaveAttribute('data-label-class', 'item-label')
  })

  it('passes custom folder classNames', () => {
    render(
      <FileTree
        classNames={{
          folders: {
            root: 'folder-root',
            label: 'folder-label'
          }
        }}
        items={[{ folder: { label: 'Folder 1' } }]}
      />
    )

    const folder = screen.getByTestId('file-tree-folder')

    expect(folder).toHaveAttribute('data-root-class', 'folder-root')
    expect(folder).toHaveAttribute('data-label-class', 'folder-label')
  })

  it('passes custom item styles', () => {
    render(
      <FileTree
        styles={{
          items: {
            root: { marginTop: '10px' },
            label: { fontWeight: 'bold' }
          }
        }}
        items={[{ item: { label: 'File 1' } }]}
      />
    )

    const item = screen.getByTestId('file-tree-item')

    expect(item).toHaveAttribute('data-root-style', JSON.stringify({ marginTop: '10px' }))

    expect(item).toHaveAttribute('data-label-style', JSON.stringify({ fontWeight: 'bold' }))
  })

  it('passes custom folder styles', () => {
    render(
      <FileTree
        styles={{
          folders: {
            root: { marginTop: '10px' },
            label: { fontWeight: 'bold' }
          }
        }}
        items={[{ folder: { label: 'Folder 1' } }]}
      />
    )

    const folder = screen.getByTestId('file-tree-folder')

    expect(folder).toHaveAttribute('data-root-style', JSON.stringify({ marginTop: '10px' }))

    expect(folder).toHaveAttribute('data-label-style', JSON.stringify({ fontWeight: 'bold' }))
  })

  it('allows item classNames to override global item classNames', () => {
    render(
      <FileTree
        classNames={{
          items: {
            root: 'global-root',
            label: 'global-label'
          }
        }}
        items={[
          {
            item: {
              label: 'File 1',
              classNames: {
                root: 'custom-root',
                label: 'custom-label'
              }
            }
          }
        ]}
      />
    )

    const item = screen.getByTestId('file-tree-item')

    expect(item).toHaveAttribute('data-root-class', 'custom-root')
    expect(item).toHaveAttribute('data-label-class', 'custom-label')
  })

  it('allows folder classNames to override global folder classNames', () => {
    render(
      <FileTree
        classNames={{
          folders: {
            root: 'global-root',
            label: 'global-label'
          }
        }}
        items={[
          {
            folder: {
              label: 'Folder 1',
              classNames: {
                root: 'custom-root',
                label: 'custom-label'
              }
            }
          }
        ]}
      />
    )

    const folder = screen.getByTestId('file-tree-folder')

    expect(folder).toHaveAttribute('data-root-class', 'custom-root')
    expect(folder).toHaveAttribute('data-label-class', 'custom-label')
  })

  it('allows item styles to override global item styles', () => {
    render(
      <FileTree
        styles={{
          items: {
            root: { marginTop: '10px' },
            label: { fontWeight: 'bold' }
          }
        }}
        items={[
          {
            item: {
              label: 'File 1',
              styles: {
                root: { marginTop: '20px' },
                label: { fontWeight: 'normal' }
              }
            }
          }
        ]}
      />
    )

    const item = screen.getByTestId('file-tree-item')

    expect(item).toHaveAttribute('data-root-style', JSON.stringify({ marginTop: '20px' }))

    expect(item).toHaveAttribute('data-label-style', JSON.stringify({ fontWeight: 'normal' }))
  })

  it('allows folder styles to override global folder styles', () => {
    render(
      <FileTree
        styles={{
          folders: {
            root: { marginTop: '10px' },
            label: { fontWeight: 'bold' }
          }
        }}
        items={[
          {
            folder: {
              label: 'Folder 1',
              styles: {
                root: { marginTop: '20px' },
                label: { fontWeight: 'normal' }
              }
            }
          }
        ]}
      />
    )

    const folder = screen.getByTestId('file-tree-folder')

    expect(folder).toHaveAttribute('data-root-style', JSON.stringify({ marginTop: '20px' }))

    expect(folder).toHaveAttribute('data-label-style', JSON.stringify({ fontWeight: 'normal' }))
  })

  it('forwards the ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<FileTree ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('ns-file-tree')
  })

  it('renders a React node as an item label', () => {
    render(
      <FileTree
        items={[
          {
            item: {
              label: <strong>File 1</strong>
            }
          }
        ]}
      />
    )

    expect(screen.getByText('File 1')).toBeInTheDocument()
    expect(screen.getByText('File 1').tagName).toBe('STRONG')
  })

  it('renders a React node as a folder label', () => {
    render(
      <FileTree
        items={[
          {
            folder: {
              label: <strong>Folder 1</strong>
            }
          }
        ]}
      />
    )

    expect(screen.getByText('Folder 1')).toBeInTheDocument()
    expect(screen.getByText('Folder 1').tagName).toBe('STRONG')
  })
})
