import { useNSUI } from '@negative-space/system'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { FileUpload } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

jest.mock('@negative-space/field', () => ({
  Field: React.forwardRef<HTMLFieldSetElement, React.ComponentPropsWithoutRef<'fieldset'>>(
    ({ children, ...props }, ref) => (
      <fieldset ref={ref} {...props}>
        {children}
      </fieldset>
    )
  )
}))

jest.mock('@negative-space/button', () => ({
  Button: React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<'button'> & {
      classNames?: {
        root?: string
      }
      styles?: {
        root?: React.CSSProperties
      }
    }
  >(({ children, classNames, styles, ...props }, ref) => (
    <button ref={ref} {...props} className={classNames?.root} style={styles?.root}>
      {children}
    </button>
  ))
}))

describe('FileUpload', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)

    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const { container } = render(<FileUpload name="file">Upload file</FileUpload>)

    const button = screen.getByRole('button', { name: 'Upload file' })
    const input = container.querySelector('input[type="file"]')
    const wrapper = container.querySelector('.nsui-file-upload')

    expect(wrapper).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'file')
    expect(input).toHaveAttribute('name', 'file')
    expect(input).toHaveAttribute('hidden')
  })

  it('should open file picker when clicked', () => {
    const click = jest.spyOn(HTMLInputElement.prototype, 'click')

    render(<FileUpload name="file">Upload file</FileUpload>)

    fireEvent.click(screen.getByRole('button', { name: 'Upload file' }))

    expect(click).toHaveBeenCalledTimes(1)
  })

  it('should not open file picker when click is prevented', () => {
    const click = jest.spyOn(HTMLInputElement.prototype, 'click')
    const onClick = jest.fn((event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    })

    render(
      <FileUpload name="file" onClick={onClick}>
        Upload file
      </FileUpload>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Upload file' }))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(click).not.toHaveBeenCalled()
  })

  it('should call onFilesChange with selected files', () => {
    const onFilesChange = jest.fn()
    const { container } = render(
      <FileUpload name="file" onFilesChange={onFilesChange}>
        Upload file
      </FileUpload>
    )

    const input = container.querySelector<HTMLInputElement>('input[type="file"]')

    if (!input) {
      throw new Error('File input not found')
    }

    const file1 = new File(['file 1'], 'file-1.txt', {
      type: 'text/plain'
    })

    const file2 = new File(['file 2'], 'file-2.txt', {
      type: 'text/plain'
    })

    fireEvent.change(input, {
      target: {
        files: [file1, file2]
      }
    })

    expect(onFilesChange).toHaveBeenCalledWith([file1, file2])
  })

  it('should call onFilesChange with an empty array when no files are selected', () => {
    const onFilesChange = jest.fn()
    const { container } = render(
      <FileUpload name="file" onFilesChange={onFilesChange}>
        Upload file
      </FileUpload>
    )

    const input = container.querySelector<HTMLInputElement>('input[type="file"]')

    if (!input) {
      throw new Error('File input not found')
    }

    fireEvent.change(input, {
      target: {
        files: null
      }
    })

    expect(onFilesChange).toHaveBeenCalledWith([])
  })

  it('should apply file input props', () => {
    const { container } = render(
      <FileUpload id="file-upload" name="documents" accept="image/*" multiple capture="environment">
        Upload files
      </FileUpload>
    )

    const input = container.querySelector('input[type="file"]')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', 'file-upload')
    expect(input).toHaveAttribute('name', 'documents')
    expect(input).toHaveAttribute('accept', 'image/*')
    expect(input).toHaveAttribute('multiple')
    expect(input).toHaveAttribute('capture', 'environment')
  })

  it('should use name as id when id is not provided', () => {
    const { container } = render(<FileUpload name="file">Upload file</FileUpload>)

    const input = container.querySelector('input[type="file"]')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', 'file')
  })

  it('should call custom event handlers', () => {
    const onClick = jest.fn()

    render(
      <FileUpload name="file" onClick={onClick}>
        Upload file
      </FileUpload>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Upload file' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should apply custom classes and styles', () => {
    render(
      <FileUpload
        name="file"
        classNames={{
          button: {
            root: 'custom-button'
          }
        }}
        styles={{
          button: {
            root: {
              padding: '10px'
            }
          }
        }}
      >
        Upload file
      </FileUpload>
    )

    const button = screen.getByRole('button', { name: 'Upload file' })

    expect(button).toHaveClass('custom-button')
    expect(button).toHaveStyle({
      padding: '10px'
    })
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLButtonElement>()

    render(
      <FileUpload ref={ref} name="file">
        Upload file
      </FileUpload>
    )

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
