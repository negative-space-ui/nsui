import { CloseButton, type CloseButtonProps } from '@negative-space/button'
import { Popover, type PopoverProps } from '@negative-space/popover'
import { cn, useNSUI } from '@negative-space/system'
import { Tooltip, type TooltipProps, useTooltip } from '@negative-space/tooltip'
import React from 'react'

import { type ModalHandle } from './useModal'

export interface ModalProps extends Omit<PopoverProps, 'popover' | 'classNames' | 'styles'> {
  classNames?: Omit<NonNullable<PopoverProps['classNames']>, 'arrow'> & {
    closeButton?: CloseButtonProps['classNames']
    tooltip?: TooltipProps['classNames']
  }
  styles?: Omit<NonNullable<PopoverProps['styles']>, 'arrow'> & {
    closeButton?: CloseButtonProps['styles']
    tooltip?: TooltipProps['styles']
  }
  closable?: boolean
  closeTitle?: string
  modal: ModalHandle
}

export const Modal = ({
  modal,
  classNames,
  styles,
  closable = true,
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
          root: styles?.root,
          content: styles?.content,
          overlay: styles?.overlay
        }}
      >
        {children}

        {closable && (
          <CloseButton
            ref={tooltip.referenceRef}
            {...tooltip.getReferenceProps()}
            aria-label={CloseTitle}
            title={!global.tooltip ? CloseTitle : undefined}
            onClick={modal.close}
            classNames={classNames?.closeButton}
            styles={{
              root: {
                position: 'absolute',
                top: 4,
                right: 4,
                ...styles?.closeButton?.root
              },
              icon: {
                ...styles?.closeButton?.icon
              }
            }}
          />
        )}
      </Popover>

      {global.tooltip && modal.isOpen && (
        <Tooltip tooltip={tooltip} classNames={classNames?.tooltip} styles={styles?.tooltip}>
          {CloseTitle}
        </Tooltip>
      )}
    </>
  )
}
