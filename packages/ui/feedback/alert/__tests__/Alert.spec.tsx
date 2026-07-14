import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Alert } from '..'

const mockNSUI = {
  tooltip: false
}

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),

  useNSUI: () => ({
    global: {
      prefixCls: 'ns',
      tooltip: mockNSUI.tooltip,
      content: {
        tooltip: mockNSUI.tooltip
      }
    },
    components: {
      alert: {
        closable: true
      },
      modal: {
        closeTitle: 'Close'
      }
    }
  }),

  Info: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="info-icon" {...props} />,

  CheckCircle2: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="success-icon" {...props} />
  ),

  XCircle: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="error-icon" {...props} />,

  TriangleAlert: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="warning-icon" {...props} />
  )
}))

jest.mock('@negative-space/flex', () => ({
  Flex: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, ...props }, ref) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  )
}))

jest.mock('@negative-space/info', () => ({
  Info: ({ heading, description }: { heading: string; description?: string }) => (
    <div>
      <span>{heading}</span>
      {description && <span>{description}</span>}
    </div>
  )
}))

jest.mock('@negative-space/button', () => ({
  CloseButton: React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ onClick, ...props }, ref) => (
      <button ref={ref} onClick={onClick} {...props}>
        Close
      </button>
    )
  )
}))

jest.mock('@negative-space/progress-bar', () => ({
  ProgressBar: ({ value }: { value: number }) => <div data-testid="progress">{value}</div>
}))

jest.mock('@negative-space/tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip">{children}</div>
  ),

  useTooltip: () => ({
    referenceRef: jest.fn(),
    getReferenceProps: () => ({
      'data-testid': 'tooltip-trigger'
    })
  })
}))

describe('Alert', () => {
  afterEach(() => {
    mockNSUI.tooltip = false
  })

  it('renders heading and description', () => {
    render(<Alert heading="Title" description="Description" />)

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('does not render when open is false', () => {
    const { container } = render(<Alert heading="Title" open={false} />)

    expect(container.firstChild).toBeNull()
  })

  it('renders success icon', () => {
    render(<Alert heading="Title" variant="success" />)

    expect(screen.getByTestId('success-icon')).toBeInTheDocument()
  })

  it('renders error icon', () => {
    render(<Alert heading="Title" variant="error" />)

    expect(screen.getByTestId('error-icon')).toBeInTheDocument()
  })

  it('renders warning icon', () => {
    render(<Alert heading="Title" variant="warning" />)

    expect(screen.getByTestId('warning-icon')).toBeInTheDocument()
  })

  it('renders info icon', () => {
    render(<Alert heading="Title" variant="info" />)

    expect(screen.getByTestId('info-icon')).toBeInTheDocument()
  })

  it('renders custom icon instead of variant icon', () => {
    render(<Alert heading="Title" variant="success" icon={<div data-testid="custom-icon" />} />)

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('success-icon')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn()

    render(<Alert heading="Title" onClose={onClose} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not render close button when closable is false', () => {
    render(<Alert heading="Title" closable={false} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders progress bar', () => {
    render(
      <Alert
        heading="Title"
        progressBar={{
          value: 45
        }}
      />
    )

    expect(screen.getByTestId('progress')).toHaveTextContent('45')
  })

  it('does not render progress bar without value', () => {
    render(<Alert heading="Title" />)

    expect(screen.queryByTestId('progress')).not.toBeInTheDocument()
  })

  it('renders prefix and suffix', () => {
    render(<Alert heading="Title" prefix={<span>Prefix</span>} suffix={<span>Suffix</span>} />)

    expect(screen.getByText('Prefix')).toBeInTheDocument()
    expect(screen.getByText('Suffix')).toBeInTheDocument()
  })

  it('renders tooltip when enabled', () => {
    mockNSUI.tooltip = true

    render(<Alert heading="Title" />)

    expect(screen.getByRole('button')).toHaveTextContent('Close')
    expect(screen.getByTestId('tooltip')).toHaveTextContent('Close')
  })

  it('passes tooltip trigger props to close button', () => {
    mockNSUI.tooltip = true

    render(<Alert heading="Title" />)

    expect(screen.getByTestId('tooltip-trigger')).toBeInTheDocument()
  })
})
