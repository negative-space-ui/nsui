import { IconButton, type IconButtonProps } from '@negative-space/button/src/IconButton'
import { Popover, type PopoverProps } from '@negative-space/popover'
import { cn, useNSUI, X } from '@negative-space/system'
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
  hideCloseButton?: boolean
  buttonProps?: Omit<IconButtonProps, 'onClick' | 'aria-label' | 'className' | 'style'>
  modal: ModalHandle
}

export const Modal = ({
  modal,
  hideCloseButton,
  classNames,
  styles,
  title,
  children,
  ...popoverProps
}: ModalProps) => {
  const { global, components } = useNSUI()

  const Title = title ?? components.modal?.closeTitle

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
        {!hideCloseButton && (
          <IconButton
            {...modal.triggerProps}
            {...tooltip.triggerProps}
            aria-label={Title}
            title={!global.tooltip ? Title : undefined}
            onClick={modal.close}
            className={cn(`${global.prefixCls}-modal-close-button`, classNames?.closeButton)}
            style={{ position: 'absolute', right: '0.5rem', top: '0.5rem', ...styles?.closeButton }}
          >
            <X
              className={cn(`${global.prefixCls}-modal-close-icon`, classNames?.closeIcon)}
              style={styles?.closeIcon}
            />
          </IconButton>
        )}
        {children}
      </Popover>
      {global.tooltip && modal.isOpen && (
        <Tooltip tooltip={tooltip} classNames={classNames?.tooltip} styles={styles?.tooltip}>
          {Title}
        </Tooltip>
      )}
    </>
  )
}
