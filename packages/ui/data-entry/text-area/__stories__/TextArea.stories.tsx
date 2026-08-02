import React from 'react'

import { TextArea, type TextAreaProps } from '../src'

export default {
  title: 'Data Entry/Text area',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    classNames: {
      root: 'w-xs h-30 bg-neutral-200 p-2 rounded-md border border-neutral-300 outline-none text-neutral-900'
    }
  }
}

export const Default = (args: TextAreaProps) => <TextArea {...args} />

export const WithCharacterCount = (args: TextAreaProps) => (
  <TextArea
    {...args}
    classNames={{
      ...args.classNames,
      wrapper: 'relative',
      characterCount: 'text-neutral-500 absolute bottom-3 right-3'
    }}
    showCharacterCount
    maxLength={100}
  />
)
