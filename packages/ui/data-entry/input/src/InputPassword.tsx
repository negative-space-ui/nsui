import { IconButton, type IconButtonProps } from '@negative-space/button'
import { cn, Eye, EyeOff, useNSUI } from '@negative-space/system'
import { Tooltip, type TooltipProps, useTooltip } from '@negative-space/tooltip'
import React from 'react'

import { Input, type InputProps } from '.'

export interface InputPasswordProps extends Omit<
  InputProps,
  'classNames' | 'styles' | 'suffix' | 'type'
> {
  classNames?: InputProps['classNames'] & {
    button?: string
    icon?: string
    tooltip?: TooltipProps['classNames']
  }
  styles?: InputProps['styles'] & {
    button?: React.CSSProperties
    icon?: React.CSSProperties
    tooltip?: TooltipProps['styles']
  }
  onToggleVisibility?: (visible: boolean) => void
  buttonProps?: Omit<IconButtonProps, 'onClick' | 'aria-label'>
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ onToggleVisibility, title, classNames, styles, buttonProps, ...rest }, ref) => {
    const { global, components } = useNSUI()
    const [visible, setVisible] = React.useState(false)

    const Title =
      title ??
      (visible ? components.inputPassword.passwordTitle : components.inputPassword.textTitle)

    const tooltip = useTooltip()

    const handleToggle = () => {
      setVisible((prev) => {
        const next = !prev
        onToggleVisibility?.(next)
        return next
      })
    }

    return (
      <>
        <Input
          {...rest}
          ref={ref}
          type={visible ? 'text' : 'password'}
          data-visible={visible}
          classNames={{
            ...classNames,
            root: cn(classNames?.root, `${global.prefixCls}-input-password`)
          }}
          styles={styles}
          suffix={
            <IconButton
              {...buttonProps}
              {...tooltip.triggerProps}
              onClick={handleToggle}
              title={!global.tooltip ? Title : undefined}
              aria-label={Title}
              className={classNames?.button}
              style={styles?.button}
            >
              {visible ? (
                <EyeOff className={classNames?.icon} style={styles?.icon} />
              ) : (
                <Eye className={classNames?.icon} style={styles?.icon} />
              )}
            </IconButton>
          }
        />
        {global.tooltip && (
          <Tooltip tooltip={tooltip} classNames={classNames?.tooltip} styles={styles?.tooltip}>
            {Title}
          </Tooltip>
        )}
      </>
    )
  }
)

InputPassword.displayName = 'InputPassword'
