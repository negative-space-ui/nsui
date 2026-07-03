import React from 'react'

import { CloseButton, type CloseButtonProps } from '..'

export default {
  title: 'Actions/Buttons/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  args: {
    className:
      'p-1 bg-neutral-300 border border-neutral-400/25 text-neutral-500 rounded-full active:scale-97'
  }
}

export const Default = (args: CloseButtonProps) => <CloseButton {...args} />
