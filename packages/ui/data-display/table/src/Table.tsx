import { ResizableHandle } from '@negative-space/resizable'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { TableBody } from './TableBody'
import { TableData } from './TableData'
import { TableFooter } from './TableFooter'
import { TableHead } from './TableHead'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'

export interface TableColumn<T = Record<string, unknown>> {
  key?: React.Key
  title: React.ReactNode
  dataIndex?: keyof T
  width?: number
  minWidth?: number
  maxWidth?: number
  resizable?: boolean
  render?: (value: T[keyof T] | undefined, record: T, index: number) => React.ReactNode
}

export interface TableProps<T = Record<string, unknown>> extends Omit<
  React.HTMLAttributes<HTMLTableElement>,
  'className' | 'style' | 'children'
> {
  classNames?: {
    root?: string
    header?: string
    head?: string
    body?: string
    row?: string
    handle?: string
    data?: string
    footer?: string
  }

  styles?: {
    root?: React.CSSProperties
    header?: React.CSSProperties
    head?: React.CSSProperties
    body?: React.CSSProperties
    row?: React.CSSProperties
    handle?: React.CSSProperties
    data?: React.CSSProperties
    footer?: React.CSSProperties
  }

  columns: TableColumn<T>[]
  data?: T[]
  footer?: React.ReactNode
}

const TableComponent = React.forwardRef<HTMLTableElement, TableProps<Record<string, unknown>>>(
  ({ classNames, styles, columns, data = [], footer, ...props }, ref) => {
    const { global } = useNSUI()

    const getColumnId = (column: TableColumn, index: number): string => {
      return String(column.key ?? index)
    }

    const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>(() =>
      Object.fromEntries(
        columns.map((column, index) => {
          const id = getColumnId(column, index)

          return [id, column.width ?? 150]
        })
      )
    )

    const resizeColumn = React.useCallback((column: TableColumn, index: number, delta: number) => {
      const id = getColumnId(column, index)

      setColumnWidths((current) => {
        const currentWidth = current[id] ?? column.width ?? 150

        const minWidth = column.minWidth ?? 40

        const maxWidth = column.maxWidth ?? Infinity

        const width = Math.min(maxWidth, Math.max(minWidth, currentWidth + delta))

        return {
          ...current,
          [id]: width
        }
      })
    }, [])

    return (
      <table
        ref={ref}
        className={cn(`${global.prefixCls}-table`, classNames?.root)}
        style={{
          tableLayout: 'fixed',
          ...styles?.root
        }}
        {...props}
      >
        <TableHeader className={classNames?.header} style={styles?.header}>
          <TableRow className={classNames?.row} style={styles?.row}>
            {columns.map((column, index) => {
              const id = getColumnId(column, index)
              const width = columnWidths[id]
              const isLastColumn = index === columns.length - 1

              return (
                <TableHead
                  key={id}
                  className={classNames?.head}
                  style={{
                    position: 'relative',
                    width,
                    minWidth: column.minWidth ?? 40,
                    maxWidth: column.maxWidth,
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: width,
                    boxSizing: 'border-box',
                    ...styles?.head
                  }}
                >
                  {column.title}

                  {column.resizable !== false && !isLastColumn && (
                    <ResizableHandle
                      onResize={(delta) => resizeColumn(column, index, delta)}
                      className={classNames?.handle}
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: 1,
                        height: '100%',
                        userSelect: 'none',
                        border: 'none',
                        ...styles?.handle
                      }}
                    />
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>

        <TableBody className={classNames?.body} style={styles?.body}>
          {data.map((record, rowIndex) => (
            <TableRow key={rowIndex} className={classNames?.row} style={styles?.row}>
              {columns.map((column, columnIndex) => {
                const value = column.dataIndex ? record[column.dataIndex] : undefined

                const id = getColumnId(column, columnIndex)
                const width = columnWidths[id]

                return (
                  <TableData
                    key={id}
                    className={classNames?.data}
                    style={{
                      width,
                      minWidth: column.minWidth ?? 40,
                      maxWidth: column.maxWidth,
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: width,
                      boxSizing: 'border-box',
                      ...styles?.data
                    }}
                  >
                    {column.render
                      ? column.render(value, record, rowIndex)
                      : (value as React.ReactNode)}
                  </TableData>
                )
              })}
            </TableRow>
          ))}
        </TableBody>

        {footer && (
          <TableFooter
            className={cn(`${global.prefixCls}-table-footer`, classNames?.footer)}
            style={styles?.footer}
          >
            {footer}
          </TableFooter>
        )}
      </table>
    )
  }
)

TableComponent.displayName = 'Table'

export const Table = TableComponent as <T = Record<string, unknown>>(
  props: TableProps<T> & React.RefAttributes<HTMLTableElement>
) => React.ReactElement | null
