import { Button, type ButtonProps } from '@negative-space/button'
import { Info, type InfoProps } from '@negative-space/info'
import { Modal, type ModalProps } from '@negative-space/modal'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface DialogProps extends Omit<ModalProps, 'children'> {
  classNames?: ModalProps['classNames'] & {
    info?: InfoProps['classNames']
    footer?: string
    confirmButton?: ButtonProps['classNames']
    cancelButton?: ButtonProps['classNames']
  }
  styles?: ModalProps['styles'] & {
    info?: InfoProps['styles']
    footer?: React.CSSProperties
    confirmButton?: ButtonProps['styles']
    cancelButton?: ButtonProps['styles']
  }
  onConfirm?: () => void
  onCancel?: () => void
  showCancelButton?: boolean
  confirmText?: string
  cancelText?: string
  closeOnConfirm?: boolean
  closeOnCancel?: boolean
  cancelButtonProps?: Omit<ButtonProps, 'onClick' | 'children'>
  confirmButtonProps?: Omit<ButtonProps, 'onClick' | 'children'>
  infoProps?: Omit<InfoProps, 'classNames' | 'styles'>
}

export function Dialog({
  modal,
  classNames,
  styles,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  showCancelButton = true,
  closeOnConfirm = true,
  closeOnCancel = true,
  cancelButtonProps,
  confirmButtonProps,
  infoProps,
  ...modalProps
}: DialogProps) {
  const { global, components } = useNSUI()

  const CancelText = cancelText ?? components.dialog.cancelText
  const ConfirmText = confirmText ?? components.dialog.confirmText

  const handleConfirm = () => {
    onConfirm?.()
    if (closeOnConfirm) modal.close()
  }

  const handleCancel = () => {
    onCancel?.()
    if (closeOnCancel) modal.close()
  }

  return (
    <Modal
      modal={modal}
      classNames={{
        root: cn(`${global.prefixCls}-dialog`, classNames?.root),
        content: classNames?.content,
        overlay: classNames?.overlay,
        closeButton: classNames?.closeButton,
        tooltip: classNames?.tooltip
      }}
      styles={{
        root: styles?.root,
        content: styles?.content,
        overlay: styles?.overlay,
        closeButton: styles?.closeButton,
        tooltip: styles?.tooltip
      }}
      {...modalProps}
    >
      <Info {...infoProps} classNames={classNames?.info} styles={styles?.info} />
      <div
        className={cn(`${global.prefixCls}-dialog-footer`, classNames?.footer)}
        style={styles?.footer}
      >
        {showCancelButton && (
          <Button
            onClick={handleCancel}
            classNames={classNames?.cancelButton}
            styles={styles?.cancelButton}
            {...cancelButtonProps}
          >
            {CancelText}
          </Button>
        )}

        <Button
          onClick={handleConfirm}
          classNames={classNames?.confirmButton}
          styles={styles?.confirmButton}
          {...confirmButtonProps}
        >
          {ConfirmText}
        </Button>
      </div>
    </Modal>
  )
}
