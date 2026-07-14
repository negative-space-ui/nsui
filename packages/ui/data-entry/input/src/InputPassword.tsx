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
    iconButton?: IconButtonProps['classNames']
    tooltip?: TooltipProps['classNames']
  }
  styles?: InputProps['styles'] & {
    iconButton?: IconButtonProps['styles']
    tooltip?: TooltipProps['styles']
  }
  onToggleVisibility?: (visible: boolean) => void
  buttonProps?: Omit<IconButtonProps, 'onClick' | 'aria-label'>
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ classNames, styles, onToggleVisibility, title, flexProps, buttonProps, ...props }, ref) => {
    const { global, components } = useNSUI()
    const [visible, setVisible] = React.useState(false)

    const mergedFlexProps = {
      alignItems: 'center',
      ...flexProps
    }

    const Title =
      title ??
      (visible ? components.inputPassword?.passwordTitle : components.inputPassword?.textTitle)

    const tooltip = useTooltip()

    const handleToggle = () => {
      setVisible((prev) => {
        const next = !prev
        onToggleVisibility?.(next)
        return next
      })
    }

    const passwordIcon = (
      <IconButton
        {...buttonProps}
        {...tooltip.triggerProps}
        onClick={handleToggle}
        title={!global.tooltip ? Title : undefined}
        aria-label={Title}
        classNames={{
          root: cn(`${global.prefixCls}-input-password-button`, classNames?.iconButton?.root),
          ...classNames?.iconButton
        }}
        styles={styles?.iconButton}
      >
        {visible ? (
          <EyeOff
            className={cn(`${global.prefixCls}-input-password-icon`, classNames?.iconButton?.icon)}
            style={styles?.iconButton?.icon}
          />
        ) : (
          <Eye
            className={cn(`${global.prefixCls}-input-password-icon`, classNames?.iconButton?.icon)}
            style={styles?.iconButton?.icon}
          />
        )}
      </IconButton>
    )

    return (
      <>
        <Input
          {...props}
          ref={ref}
          type={visible ? 'text' : 'password'}
          flexProps={mergedFlexProps}
          data-visible={visible}
          classNames={{
            ...classNames,
            root: cn(classNames?.root, `${global.prefixCls}-input-password`)
          }}
          styles={styles}
          suffix={passwordIcon}
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
