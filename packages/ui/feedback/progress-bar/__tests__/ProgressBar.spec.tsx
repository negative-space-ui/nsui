import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { ProgressBar } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

const mockedUseNSUI = useNSUI as jest.Mock

describe('ProgressBar', () => {
  beforeEach(() => {
    mockedUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders progress bar', () => {
    render(<ProgressBar value={50} />)

    const progress = screen.getByRole('progressbar')

    expect(progress).toBeInTheDocument()
  })

  it('applies default progress bar class', () => {
    render(<ProgressBar value={50} />)

    expect(screen.getByRole('progressbar')).toHaveClass('nsui-progress-bar')
  })

  it('calculates width based on value and max', () => {
    render(<ProgressBar value={25} max={50} />)

    expect(screen.getByRole('progressbar')).toHaveStyle({
      width: '50%'
    })
  })

  it('uses default max value of 100', () => {
    render(<ProgressBar value={40} />)

    expect(screen.getByRole('progressbar')).toHaveStyle({
      width: '40%'
    })
  })

  it('merges custom className', () => {
    render(<ProgressBar value={50} className="custom-class" />)

    expect(screen.getByRole('progressbar')).toHaveClass('nsui-progress-bar', 'custom-class')
  })

  it('preserves custom styles', () => {
    render(
      <ProgressBar
        value={50}
        style={{
          height: '10px'
        }}
      />
    )

    expect(screen.getByRole('progressbar')).toHaveStyle({
      width: '50%',
      height: '10px'
    })
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<ProgressBar ref={ref} value={50} />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('passes HTML attributes', () => {
    render(<ProgressBar value={50} data-testid="progress" />)

    expect(screen.getByTestId('progress')).toBeInTheDocument()
  })
})
