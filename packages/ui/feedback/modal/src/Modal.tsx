import { IconButton, type IconButtonProps } from '@negative-space/button/src/IconButton'
import { Popover, type PopoverProps } from '@negative-space/popover'
import { cn, useNSUI, X } from '@negative-space/system'
import React from 'react'

import { type ModalHandle } from './useModal'

export interface ModalProps extends Omit<PopoverProps, 'popover' | 'classNames' | 'styles'> {
  classNames?: Omit<NonNullable<PopoverProps['classNames']>, 'arrow'> & {
    closeButton?: string
    closeIcon?: string
  }
  styles?: Omit<NonNullable<PopoverProps['styles']>, 'arrow'> & {
    closeButton?: React.CSSProperties
    closeIcon?: React.CSSProperties
  }
  hideCloseButton?: boolean
  buttonProps?: Omit<IconButtonProps, 'onClick' | 'aria-label' | 'className' | 'style'>
  modal: ModalHandle
}

export const Modal = ({
  modal,
  hideCloseButton,
  classNames,
  styles,
  children,
  ...popoverProps
}: ModalProps) => {
  const { global } = useNSUI()

  return (
    <Popover
      {...popoverProps}
      popover={modal}
      role="dialog"
      classNames={{
        root: cn(`${global.prefixCls}-modal`, classNames?.root),
        content: cn(`${global.prefixCls}-modal-content`, classNames?.content),
        overlay: cn(`${global.prefixCls}-modal-overlay`, classNames?.overlay)
      }}
      styles={{
        root: { ...styles?.root },
        content: { ...styles?.content },
        overlay: { ...styles?.overlay }
      }}
    >
      {!hideCloseButton && (
        <IconButton
          {...modal.triggerProps}
          aria-label="close"
          onClick={modal.close}
          className={cn(`${global.prefixCls}-modal-close-button`, classNames?.closeButton)}
          style={styles?.closeButton}
        >
          <X
            className={cn(`${global.prefixCls}-modal-close`, classNames?.closeIcon)}
            style={{ position: 'absolute', right: '0.5rem', top: '0.5rem', ...styles?.closeIcon }}
          />
        </IconButton>
      )}
      {children}
    </Popover>
  )
}
