import { render, screen } from '@testing-library/react'
import React from 'react'

import { Table, type TableColumn } from '..'

jest.mock('@negative-space/system', () => ({
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  }),
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
}))

jest.mock('@negative-space/resizable', () => ({
  ResizableHandle: ({ onResize, ...props }: { onResize?: (delta: number) => void }) => (
    <button
      type="button"
      data-testid="resizable-handle"
      onClick={() => onResize?.(10)}
      {...props}
    />
  )
}))

describe('Table', () => {
  const columns: TableColumn<{ name: string; age: number }>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name'
    },
    {
      key: 'age',
      title: 'Age',
      dataIndex: 'age'
    }
  ]

  const data = [
    {
      name: 'John',
      age: 25
    },
    {
      name: 'Jane',
      age: 30
    }
  ]

  it('should render columns', () => {
    render(<Table columns={columns} />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
  })

  it('should render data', () => {
    render(<Table columns={columns} data={data} />)

    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  it('should apply default className', () => {
    render(<Table data-testid="table" columns={columns} />)

    expect(screen.getByTestId('table')).toHaveClass('ns-table')
  })

  it('should append custom root className', () => {
    render(<Table data-testid="table" columns={columns} classNames={{ root: 'custom' }} />)

    expect(screen.getByTestId('table')).toHaveClass('ns-table', 'custom')
  })

  it('should pass props to table', () => {
    render(<Table data-testid="table" aria-label="users" columns={columns} />)

    expect(screen.getByTestId('table')).toHaveAttribute('aria-label', 'users')
  })

  it('should render custom cell content with render', () => {
    const renderColumns: TableColumn<{ name: string }>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (value) => <strong>{String(value).toUpperCase()}</strong>
      }
    ]

    render(<Table columns={renderColumns} data={[{ name: 'John' }]} />)

    expect(screen.getByText('JOHN')).toBeInTheDocument()
  })

  it('should render footer', () => {
    render(<Table columns={columns} footer={<span>Footer content</span>} />)

    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('should not render footer when it is not provided', () => {
    render(<Table columns={columns} />)

    expect(screen.queryByText('Footer content')).not.toBeInTheDocument()
  })

  it('should render resizable handles by default', () => {
    render(<Table columns={columns} />)

    expect(screen.getAllByTestId('resizable-handle')).toHaveLength(1)
  })

  it('should not render a resizable handle when column is not resizable', () => {
    const nonResizableColumns: TableColumn<{ name: string; age: number }>[] = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        resizable: false
      },
      {
        key: 'age',
        title: 'Age',
        dataIndex: 'age'
      }
    ]

    render(<Table columns={nonResizableColumns} />)

    expect(screen.queryAllByTestId('resizable-handle')).toHaveLength(0)
  })

  it('should not render a resizable handle for the last column', () => {
    const threeColumns: TableColumn<{ a: string; b: string; c: string }>[] = [
      {
        key: 'a',
        title: 'A',
        dataIndex: 'a'
      },
      {
        key: 'b',
        title: 'B',
        dataIndex: 'b'
      },
      {
        key: 'c',
        title: 'C',
        dataIndex: 'c'
      }
    ]

    render(<Table columns={threeColumns} />)

    expect(screen.getAllByTestId('resizable-handle')).toHaveLength(2)
  })

  it('should apply column width', () => {
    render(
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            width: 200
          }
        ]}
      />
    )

    expect(screen.getByText('Name')).toHaveStyle({
      width: '200px'
    })
  })

  it('should apply minWidth and maxWidth to column', () => {
    render(
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            minWidth: 100,
            maxWidth: 300
          }
        ]}
      />
    )

    expect(screen.getByText('Name')).toHaveStyle({
      minWidth: '100px',
      maxWidth: '300px'
    })
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLTableElement>()

    render(<Table ref={ref} columns={columns} />)

    expect(ref.current).toBeTruthy()
    expect(ref.current?.tagName).toBe('TABLE')
  })
})
