import { useNSUI } from '@negative-space/system'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Modal } from '..'
import type { ModalHandle } from '../src/useModal'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

jest.mock('@negative-space/popover', () => ({
  Popover: ({
    children,
    role,
    classNames
  }: {
    children: React.ReactNode
    role?: string
    classNames?: {
      root?: string
      content?: string
      overlay?: string
    }
  }) => (
    <div
      role={role}
      data-root={classNames?.root}
      data-content={classNames?.content}
      data-overlay={classNames?.overlay}
    >
      {children}
    </div>
  )
}))

jest.mock('@negative-space/button', () => ({
  CloseButton: (props: { onClick?: () => void; 'aria-label'?: string }) => (
    <button aria-label={props['aria-label']} onClick={props.onClick}>
      close
    </button>
  )
}))

jest.mock('@negative-space/tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip">{children}</div>
  ),

  useTooltip: () => ({
    referenceRef: React.createRef<HTMLElement>(),
    getReferenceProps: () => ({})
  })
}))

describe('Modal', () => {
  const createModal = (overrides: Partial<ModalHandle> = {}): ModalHandle =>
    ({
      isOpen: false,
      isPositioned: true,

      floatingStyles: {},

      context: {} as ModalHandle['context'],

      arrowRef: React.createRef<SVGSVGElement>(),
      floatingRef: React.createRef<HTMLDivElement>(),

      referenceRef: React.createRef<HTMLElement>(),

      open: jest.fn(),
      close: jest.fn(),
      toggle: jest.fn(),

      getReferenceProps: jest.fn(() => ({})),
      getFloatingProps: jest.fn((props) => props),

      opts: {
        trigger: 'click',
        trapFocus: false,
        fixedPosition: false,
        zIndex: 1000,
        overlay: false,
        showArrow: false,
        usePortal: false
      },

      ...overrides
    }) as ModalHandle

  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui',
        tooltip: false
      },
      components: {
        modal: {
          closeTitle: 'Close'
        }
      }
    } as ReturnType<typeof useNSUI>)
  })

  it('should render modal classes', () => {
    render(<Modal modal={createModal()}>Content</Modal>)

    const dialog = screen.getByRole('dialog')

    expect(dialog).toHaveAttribute('data-root', 'nsui-modal')

    expect(dialog).toHaveAttribute('data-content', 'nsui-modal-content')

    expect(dialog).toHaveAttribute('data-overlay', 'nsui-modal-overlay')
  })

  it('should render close button by default', () => {
    render(<Modal modal={createModal()}>Content</Modal>)

    expect(
      screen.getByRole('button', {
        name: 'Close'
      })
    ).toBeInTheDocument()
  })

  it('should not render close button when closable is false', () => {
    render(
      <Modal modal={createModal()} closable={false}>
        Content
      </Modal>
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should call close when clicking close button', () => {
    const modal = createModal()

    render(<Modal modal={modal}>Content</Modal>)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Close'
      })
    )

    expect(modal.close).toHaveBeenCalled()
  })

  it('should render tooltip when enabled and modal is open', () => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui',
        tooltip: true
      },
      components: {
        modal: {
          closeTitle: 'Close'
        }
      }
    } as ReturnType<typeof useNSUI>)

    render(
      <Modal
        modal={createModal({
          isOpen: true
        })}
      >
        Content
      </Modal>
    )

    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
  })
})
