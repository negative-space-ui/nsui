import { Button } from '@negative-space/button'
import { useModal } from '@negative-space/modal'
import React from 'react'

import { Dialog, type DialogProps } from '..'

export default {
  title: 'Action/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    infoProps: {
      heading: 'Dialog heading',
      description: 'Dialog description'
    },
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    showCancelButton: true,
    classNames: {
      root: 'w-full w-sm bg-neutral-200 rounded-md border border-neutral-300/50 shadow-md',
      content: 'p-4',
      overlay: 'bg-black/20 backdrop-blur-[1px]',
      info: {
        heading: 'text-neutral-700 text-lg font-medium',
        description: 'text-neutral-500'
      },
      footer: 'flex items-center justify-end gap-2',
      confirmButton: {
        root: 'bg-red-500 hover:bg-red-600 active:scale-97 px-2 py-1 rounded-md text-white',
        spinner: 'w-4 h-4'
      },
      cancelButton: {
        root: 'bg-blue-500 text-white hover:bg-blue-600 active:scale-97 px-2 py-1 rounded-md'
      },
      closeButton: { root: 'cursor-pointer', icon: 'w-5 h-5  text-gray-500 hover:text-gray-700' },
      tooltip: {
        root: 'bg-neutral-200 px-2 py-1 rounded-md shadow-md border-1 border-neutral-300',
        arrow: 'fill-neutral-200'
      }
    }
  },
  argTypes: {
    showCancelButton: { control: 'boolean' },
    closeOnConfirm: { control: 'boolean' },
    closeOnCancel: { control: 'boolean' }
  }
}

export const Default = (args: DialogProps) => {
  const modal = useModal()

  return (
    <>
      <Button
        classNames={{ root: 'cursor-pointer bg-neutral-300 rounded-md px-2 py-1 text-neutral-900' }}
        onClick={modal.open}
      >
        Open Modal
      </Button>
      <Dialog {...args} modal={modal} />
    </>
  )
}
