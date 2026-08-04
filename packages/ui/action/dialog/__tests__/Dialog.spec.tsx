import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Dialog, type DialogProps } from '..'

const mockClose = jest.fn()

const modal = {
  close: mockClose
} as unknown as DialogProps['modal']

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    },
    components: {
      dialog: {
        cancelText: 'Cancel',
        confirmText: 'Confirm'
      }
    }
  })
}))

jest.mock('@negative-space/modal', () => ({
  Modal: React.forwardRef(
    (
      {
        children,
        classNames,
        styles,
        ...props
      }: React.PropsWithChildren<{
        modal: {
          close: () => void
        }
        classNames?: {
          root?: string
          content?: string
          overlay?: string
          closeButton?: string
          tooltip?: string
        }
        styles?: {
          root?: React.CSSProperties
          content?: React.CSSProperties
          overlay?: React.CSSProperties
          closeButton?: React.CSSProperties
          tooltip?: React.CSSProperties
        }
      }>,
      ref: React.Ref<HTMLDivElement>
    ) => (
      <div
        ref={ref}
        data-testid="modal"
        data-content-class={classNames?.content}
        data-overlay-class={classNames?.overlay}
        data-close-button-class={JSON.stringify(classNames?.closeButton)}
        data-tooltip-class={JSON.stringify(classNames?.tooltip)}
        data-content-style={JSON.stringify(styles?.content)}
        data-overlay-style={JSON.stringify(styles?.overlay)}
        data-close-button-style={JSON.stringify(styles?.closeButton)}
        data-tooltip-style={JSON.stringify(styles?.tooltip)}
        className={classNames?.root}
        style={styles?.root}
        {...props}
      >
        {children}
      </div>
    )
  )
}))

jest.mock('@negative-space/info', () => ({
  Info: React.forwardRef(
    (
      {
        classNames,
        styles,
        ...props
      }: {
        classNames?: Record<string, string>
        styles?: Record<string, React.CSSProperties>
      },
      ref: React.Ref<HTMLDivElement>
    ) => (
      <div
        ref={ref}
        data-testid="info"
        data-class-names={JSON.stringify(classNames)}
        data-styles={JSON.stringify(styles)}
        {...props}
      />
    )
  )
}))

jest.mock('@negative-space/button', () => ({
  Button: React.forwardRef(
    (
      {
        children,
        classNames,
        styles,
        ...props
      }: React.PropsWithChildren<{
        classNames?: Record<string, string>
        styles?: Record<string, React.CSSProperties>
      }>,
      ref: React.Ref<HTMLButtonElement>
    ) => (
      <button
        ref={ref}
        data-testid="button"
        data-class-names={JSON.stringify(classNames)}
        data-styles={JSON.stringify(styles)}
        {...props}
      >
        {children}
      </button>
    )
  )
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Dialog', () => {
  it('renders the modal', () => {
    render(<Dialog modal={modal} />)

    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })

  it('applies the prefixed root class', () => {
    render(<Dialog modal={modal} />)

    expect(screen.getByTestId('modal')).toHaveClass('ns-dialog')
  })

  it('applies custom root class', () => {
    render(<Dialog modal={modal} classNames={{ root: 'custom-root' }} />)

    expect(screen.getByTestId('modal')).toHaveClass('ns-dialog', 'custom-root')
  })

  it('applies custom root styles', () => {
    render(<Dialog modal={modal} styles={{ root: { marginTop: '10px' } }} />)

    expect(screen.getByTestId('modal')).toHaveStyle({
      marginTop: '10px'
    })
  })

  it('passes props to the modal', () => {
    render(<Dialog modal={modal} data-testid="dialog" aria-label="Dialog" />)

    const modalElement = screen.getByTestId('dialog')

    expect(modalElement).toHaveAttribute('aria-label', 'Dialog')
  })

  it('renders the info component', () => {
    render(<Dialog modal={modal} />)

    expect(screen.getByTestId('info')).toBeInTheDocument()
  })

  it('passes info props to Info', () => {
    render(
      <Dialog
        modal={modal}
        infoProps={{
          title: 'Information',
          description: 'Something happened'
        }}
      />
    )

    const info = screen.getByTestId('info')

    expect(info).toHaveAttribute('title', 'Information')
    expect(info).toHaveAttribute('description', 'Something happened')
  })

  it('passes info classNames to Info', () => {
    render(
      <Dialog
        modal={modal}
        classNames={{
          info: {
            root: 'info-root'
          }
        }}
      />
    )

    expect(screen.getByTestId('info')).toHaveAttribute(
      'data-class-names',
      JSON.stringify({
        root: 'info-root'
      })
    )
  })

  it('passes info styles to Info', () => {
    render(
      <Dialog
        modal={modal}
        styles={{
          info: {
            root: {
              marginBottom: '10px'
            }
          }
        }}
      />
    )

    expect(screen.getByTestId('info')).toHaveAttribute(
      'data-styles',
      JSON.stringify({
        root: {
          marginBottom: '10px'
        }
      })
    )
  })

  it('renders the footer', () => {
    render(<Dialog modal={modal} />)

    expect(screen.getByText('Cancel').parentElement).toHaveClass('ns-dialog-footer')
  })

  it('applies custom footer class', () => {
    render(
      <Dialog
        modal={modal}
        classNames={{
          footer: 'custom-footer'
        }}
      />
    )

    expect(screen.getByText('Cancel').parentElement).toHaveClass(
      'ns-dialog-footer',
      'custom-footer'
    )
  })

  it('applies custom footer styles', () => {
    render(
      <Dialog
        modal={modal}
        styles={{
          footer: {
            marginTop: '20px'
          }
        }}
      />
    )

    expect(screen.getByText('Cancel').parentElement).toHaveStyle({
      marginTop: '20px'
    })
  })

  it('renders the cancel and confirm buttons by default', () => {
    render(<Dialog modal={modal} />)

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('does not render the cancel button when showCancelButton is false', () => {
    render(<Dialog modal={modal} showCancelButton={false} />)

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('uses custom cancel text', () => {
    render(<Dialog modal={modal} cancelText="No" />)

    expect(screen.getByText('No')).toBeInTheDocument()
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
  })

  it('uses custom confirm text', () => {
    render(<Dialog modal={modal} confirmText="Yes" />)

    expect(screen.getByText('Yes')).toBeInTheDocument()
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument()
  })

  it('calls onConfirm when the confirm button is clicked', () => {
    const onConfirm = jest.fn()

    render(<Dialog modal={modal} onConfirm={onConfirm} />)

    fireEvent.click(screen.getByText('Confirm'))

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('closes the modal after confirming by default', () => {
    render(<Dialog modal={modal} />)

    fireEvent.click(screen.getByText('Confirm'))

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('does not close the modal when closeOnConfirm is false', () => {
    render(<Dialog modal={modal} closeOnConfirm={false} />)

    fireEvent.click(screen.getByText('Confirm'))

    expect(mockClose).not.toHaveBeenCalled()
  })

  it('calls onCancel when the cancel button is clicked', () => {
    const onCancel = jest.fn()

    render(<Dialog modal={modal} onCancel={onCancel} />)

    fireEvent.click(screen.getByText('Cancel'))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('closes the modal after cancelling by default', () => {
    render(<Dialog modal={modal} />)

    fireEvent.click(screen.getByText('Cancel'))

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('does not close the modal when closeOnCancel is false', () => {
    render(<Dialog modal={modal} closeOnCancel={false} />)

    fireEvent.click(screen.getByText('Cancel'))

    expect(mockClose).not.toHaveBeenCalled()
  })

  it('does not call onConfirm when the cancel button is clicked', () => {
    const onConfirm = jest.fn()

    render(<Dialog modal={modal} onConfirm={onConfirm} />)

    fireEvent.click(screen.getByText('Cancel'))

    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('does not call onCancel when the confirm button is clicked', () => {
    const onCancel = jest.fn()

    render(<Dialog modal={modal} onCancel={onCancel} />)

    fireEvent.click(screen.getByText('Confirm'))

    expect(onCancel).not.toHaveBeenCalled()
  })

  it('applies confirm button classNames', () => {
    render(
      <Dialog
        modal={modal}
        classNames={{
          confirmButton: {
            root: 'confirm-root'
          }
        }}
      />
    )

    const confirmButton = screen.getByText('Confirm')

    expect(confirmButton).toHaveAttribute(
      'data-class-names',
      JSON.stringify({
        root: 'confirm-root'
      })
    )
  })

  it('applies cancel button classNames', () => {
    render(
      <Dialog
        modal={modal}
        classNames={{
          cancelButton: {
            root: 'cancel-root'
          }
        }}
      />
    )

    const cancelButton = screen.getByText('Cancel')

    expect(cancelButton).toHaveAttribute(
      'data-class-names',
      JSON.stringify({
        root: 'cancel-root'
      })
    )
  })

  it('applies confirm button styles', () => {
    render(
      <Dialog
        modal={modal}
        styles={{
          confirmButton: {
            root: {
              marginTop: '10px'
            }
          }
        }}
      />
    )

    const confirmButton = screen.getByText('Confirm')

    expect(confirmButton).toHaveAttribute(
      'data-styles',
      JSON.stringify({
        root: {
          marginTop: '10px'
        }
      })
    )
  })

  it('applies cancel button styles', () => {
    render(
      <Dialog
        modal={modal}
        styles={{
          cancelButton: {
            root: {
              marginTop: '5px'
            }
          }
        }}
      />
    )

    const cancelButton = screen.getByText('Cancel')

    expect(cancelButton).toHaveAttribute(
      'data-styles',
      JSON.stringify({
        root: {
          marginTop: '5px'
        }
      })
    )
  })

  it('passes cancel button props', () => {
    render(
      <Dialog
        modal={modal}
        cancelButtonProps={{
          disabled: true,
          type: 'button'
        }}
      />
    )

    const cancelButton = screen.getByText('Cancel')

    expect(cancelButton).toBeDisabled()
    expect(cancelButton).toHaveAttribute('type', 'button')
  })

  it('passes confirm button props', () => {
    render(
      <Dialog
        modal={modal}
        confirmButtonProps={{
          disabled: true,
          type: 'submit'
        }}
      />
    )

    const confirmButton = screen.getByText('Confirm')

    expect(confirmButton).toBeDisabled()
    expect(confirmButton).toHaveAttribute('type', 'submit')
  })

  it('allows button props to override confirm button classNames', () => {
    render(
      <Dialog
        modal={modal}
        classNames={{
          confirmButton: {
            root: 'dialog-confirm'
          }
        }}
        confirmButtonProps={{
          classNames: {
            root: 'button-confirm'
          }
        }}
      />
    )

    const confirmButton = screen.getByText('Confirm')

    expect(confirmButton).toHaveAttribute(
      'data-class-names',
      JSON.stringify({
        root: 'button-confirm'
      })
    )
  })

  it('allows button props to override confirm button styles', () => {
    render(
      <Dialog
        modal={modal}
        styles={{
          confirmButton: {
            root: {
              marginTop: '10px'
            }
          }
        }}
        confirmButtonProps={{
          styles: {
            root: {
              marginTop: '20px'
            }
          }
        }}
      />
    )

    const confirmButton = screen.getByText('Confirm')

    expect(confirmButton).toHaveAttribute(
      'data-styles',
      JSON.stringify({
        root: {
          marginTop: '20px'
        }
      })
    )
  })

  it('passes modal classNames to Modal', () => {
    render(
      <Dialog
        modal={modal}
        classNames={{
          content: 'content-class',
          overlay: 'overlay-class',
          closeButton: {
            root: 'close-button-root',
            icon: 'close-button-icon'
          },
          tooltip: {
            root: 'tooltip-root',
            content: 'tooltip-content',
            arrow: 'tooltip-arrow',
            overlay: 'tooltip-overlay'
          }
        }}
      />
    )

    const modalElement = screen.getByTestId('modal')

    expect(modalElement).toHaveAttribute('data-content-class', 'content-class')
    expect(modalElement).toHaveAttribute('data-overlay-class', 'overlay-class')
    expect(modalElement).toHaveAttribute(
      'data-close-button-class',
      JSON.stringify({
        root: 'close-button-root',
        icon: 'close-button-icon'
      })
    )
    expect(modalElement).toHaveAttribute(
      'data-tooltip-class',
      JSON.stringify({
        root: 'tooltip-root',
        content: 'tooltip-content',
        arrow: 'tooltip-arrow',
        overlay: 'tooltip-overlay'
      })
    )
  })

  it('passes modal styles to Modal', () => {
    render(
      <Dialog
        modal={modal}
        styles={{
          content: {
            padding: '10px'
          },
          overlay: {
            opacity: 0.5
          },
          closeButton: {
            root: {
              top: '5px'
            }
          },
          tooltip: {
            root: {
              marginTop: '8px'
            }
          }
        }}
      />
    )

    const modalElement = screen.getByTestId('modal')

    expect(modalElement).toHaveAttribute(
      'data-content-style',
      JSON.stringify({
        padding: '10px'
      })
    )
    expect(modalElement).toHaveAttribute(
      'data-overlay-style',
      JSON.stringify({
        opacity: 0.5
      })
    )
    expect(modalElement).toHaveAttribute(
      'data-close-button-style',
      JSON.stringify({
        root: {
          top: '5px'
        }
      })
    )
    expect(modalElement).toHaveAttribute(
      'data-tooltip-style',
      JSON.stringify({
        root: {
          marginTop: '8px'
        }
      })
    )
  })
})
