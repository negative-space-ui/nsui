import React from 'react'

import { Table, type TableColumn, type TableProps } from '..'

export default {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    classNames: {
      root: 'border-x border-t border-neutral-500',
      row: 'flex flex-row border-b border-neutral-500',
      handle: 'cursor-col-resize hover:!border-r-1 hover:!border-neutral-600',
      head: 'relative bg-neutral-300 text-center font-semibold border-r border-neutral-500 last:border-r-0',
      data: 'border-r bg-neutral-100 border-neutral-500 px-1 text-center last:border-r-0'
    }
  }
}

type User = {
  name: string
  age: number
  address: string
}

const columns: TableColumn<User>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 80,
    minWidth: 60,
    resizable: true
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 100,
    minWidth: 60,
    resizable: true
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: 120,
    minWidth: 100,
    resizable: true
  }
]

const data: User[] = [
  {
    name: 'John',
    age: 30,
    address: 'New York'
  },
  {
    name: 'Joe',
    age: 28,
    address: 'Los Angeles'
  },
  {
    name: 'Jane',
    age: 32,
    address: 'Chicago'
  }
]

export const Default: React.FC<TableProps<User>> = (args) => (
  <Table {...args} columns={columns} data={data} />
)
