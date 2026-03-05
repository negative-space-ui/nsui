import React from 'react'

import { Modal, type ModalProps } from '../src'
import { useModal } from '../src'

export default {
  title: 'Feedback/Overlay/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    classNames: {
      root: 'w-md h-30 bg-neutral-200 px-2 py-1 rounded-md shadow-md border-1 border-neutral-300',
      overlay: 'bg-black/20 backdrop-blur-[1px]',
      closeIcon: 'w-5 h-5 text-gray-500 hover:text-gray-700',
      arrow: 'fill-neutral-200'
    }
  }
}

export const Default = (args: Omit<ModalProps, 'modal'>) => {
  const modal = useModal()

  return (
    <div>
      <button {...modal.triggerProps}>Click to open</button>
      <Modal {...args} modal={modal}>
        Modal Content
      </Modal>
    </div>
  )
}
