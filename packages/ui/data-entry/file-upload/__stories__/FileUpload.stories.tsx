import React from 'react'

import { FileUpload, type FileUploadProps } from '..'

export default {
  title: 'Data Entry/File upload',
  component: FileUpload,
  tags: ['autodocs'],
  args: {
    name: 'file',
    children: 'Upload file',
    classNames: {
      button: {
        root: 'border-neutral-500 cursor-pointer shadow-sm border-dashed border-1 rounded-md px-2 py-1'
      }
    }
  }
}

export const Default: React.FC<FileUploadProps> = (args) => {
  const [fileName, setFileName] = React.useState<string>()

  return (
    <FileUpload
      {...args}
      onFilesChange={(files) => {
        setFileName(files[0]?.name)
      }}
    >
      {fileName ?? args.children}
    </FileUpload>
  )
}
