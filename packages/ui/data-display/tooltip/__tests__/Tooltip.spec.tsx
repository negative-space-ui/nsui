import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Tooltip } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

jest.mock('@negative-space/popover', () => ({
  Popover: ({
    children,
    classNames,
    role
  }: {
    children: React.ReactNode
    classNames?: {
      root?: string
      content?: string
      arrow?: string
      overlay?: string
    }
    role?: string
  }) => (
    <div
      role={role}
      data-root={classNames?.root}
      data-content={classNames?.content}
      data-arrow={classNames?.arrow}
      data-overlay={classNames?.overlay}
    >
      {children}
    </div>
  )
}))

describe('Tooltip', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)
  })

  const tooltip = {} as React.ComponentProps<typeof Tooltip>['tooltip']

  it('should render as tooltip role', () => {
    render(<Tooltip tooltip={tooltip}>Tooltip content</Tooltip>)

    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('should apply tooltip prefix classes', () => {
    render(<Tooltip tooltip={tooltip}>Tooltip content</Tooltip>)

    const tooltipElement = screen.getByRole('tooltip')

    expect(tooltipElement).toHaveAttribute('data-root', 'nsui-tooltip')

    expect(tooltipElement).toHaveAttribute('data-content', 'nsui-tooltip-content')

    expect(tooltipElement).toHaveAttribute('data-arrow', 'nsui-tooltip-arrow')

    expect(tooltipElement).toHaveAttribute('data-overlay', 'nsui-tooltip-overlay')
  })

  it('should merge custom classes', () => {
    render(
      <Tooltip
        tooltip={tooltip}
        classNames={{
          root: 'custom-root'
        }}
      >
        Tooltip content
      </Tooltip>
    )

    expect(screen.getByRole('tooltip')).toHaveAttribute('data-root', 'nsui-tooltip custom-root')
  })
})
