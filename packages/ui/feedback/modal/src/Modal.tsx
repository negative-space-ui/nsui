import { CloseButton, type CloseButtonProps } from '@negative-space/button'
import { Popover, type PopoverProps } from '@negative-space/popover'
import { cn, useNSUI } from '@negative-space/system'
import { Tooltip, type TooltipProps, useTooltip } from '@negative-space/tooltip'
import React from 'react'

import { type ModalHandle } from './useModal'

export interface ModalProps extends Omit<PopoverProps, 'popover' | 'classNames' | 'styles'> {
  classNames?: Omit<NonNullable<PopoverProps['classNames']>, 'arrow'> & {
    closeButton?: string
    closeIcon?: string
    tooltip?: TooltipProps['classNames']
  }
  styles?: Omit<NonNullable<PopoverProps['styles']>, 'arrow'> & {
    closeButton?: React.CSSProperties
    closeIcon?: React.CSSProperties
    tooltip?: TooltipProps['styles']
  }
  closable?: boolean
  closeTitle?: string
  closeButtonProps?: Omit<CloseButtonProps, 'onClick' | 'aria-label' | 'className' | 'style'>
  modal: ModalHandle
}

export const Modal = ({
  modal,
  closable = true,
  classNames,
  styles,
  closeTitle,
  children,
  ...popoverProps
}: ModalProps) => {
  const { global, components } = useNSUI()

  const CloseTitle = closeTitle ?? components.modal?.closeTitle

  const tooltip = useTooltip()

  return (
    <>
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
        {closable && (
          <CloseButton
            {...modal.triggerProps}
            {...tooltip.triggerProps}
            aria-label={CloseTitle}
            title={!global.tooltip ? CloseTitle : undefined}
            onClick={modal.close}
            className={classNames?.closeButton}
            style={{ position: 'absolute', right: '0.5rem', top: '0.5rem', ...styles?.closeButton }}
          />
        )}
        {children}
      </Popover>
      {global.tooltip && modal.isOpen && (
        <Tooltip tooltip={tooltip} classNames={classNames?.tooltip} styles={styles?.tooltip}>
          {CloseTitle}
        </Tooltip>
      )}
    </>
  )
}
