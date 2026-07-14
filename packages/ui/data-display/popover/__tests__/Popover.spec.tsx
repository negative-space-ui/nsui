import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Popover } from '..'
import type { PopoverHandle } from '../src/usePopover'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

jest.mock('@floating-ui/react', () => ({
  FloatingArrow: React.forwardRef<HTMLDivElement>(() => <div data-testid="arrow" />),
  FloatingFocusManager: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  FloatingPortal: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

describe('Popover', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      },
      components: {
        popover: {
          animation: 'none'
        }
      }
    } as ReturnType<typeof useNSUI>)
  })

  const createPopover = (overrides: Partial<PopoverHandle> = {}): PopoverHandle =>
    ({
      isOpen: true,
      isPositioned: true,
      floatingStyles: {
        position: 'absolute'
      },
      arrowRef: React.createRef<SVGSVGElement>(),
      context: {} as PopoverHandle['context'],
      getFloatingProps: (props: React.HTMLProps<HTMLDivElement>) => props,
      opts: {
        trigger: 'click',
        trapFocus: false,
        fixedPosition: false,
        zIndex: 1000,
        overlay: false,
        showArrow: false,
        usePortal: false
      },
      floatingRef: React.createRef<HTMLDivElement>(),
      close: jest.fn(),
      ...overrides
    }) as PopoverHandle

  it('should render popover content when open', () => {
    render(<Popover popover={createPopover()}>Content</Popover>)

    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should render with global prefix classes', () => {
    render(<Popover popover={createPopover()}>Content</Popover>)

    expect(screen.getByText('Content')).toHaveClass('nsui-popover-content')
  })

  it('should render custom classes', () => {
    render(
      <Popover
        popover={createPopover()}
        classNames={{
          root: 'root-class',
          content: 'content-class'
        }}
      >
        Content
      </Popover>
    )

    expect(screen.getByText('Content')).toHaveClass('content-class')
  })

  it('should render arrow when enabled', () => {
    render(
      <Popover
        popover={createPopover({
          opts: {
            trigger: 'click',
            trapFocus: false,
            fixedPosition: false,
            zIndex: 1000,
            overlay: false,
            showArrow: true,
            usePortal: false
          }
        })}
      >
        Content
      </Popover>
    )

    expect(screen.getByTestId('arrow')).toBeInTheDocument()
  })

  it('should render overlay when enabled', () => {
    render(
      <Popover
        popover={createPopover({
          opts: {
            trigger: 'click',
            trapFocus: false,
            fixedPosition: false,
            zIndex: 1000,
            overlay: true,
            showArrow: false,
            usePortal: false
          }
        })}
      >
        Content
      </Popover>
    )

    expect(document.querySelector('.nsui-popover-overlay')).toBeInTheDocument()
  })

  it('should not render when closed and animation is none', () => {
    render(
      <Popover
        popover={createPopover({
          isOpen: false
        })}
      >
        Content
      </Popover>
    )

    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })
})
