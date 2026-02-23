import React from 'react'
import { cn, useNSUI, Eye, EyeOff } from '@negative-space/system'
import { Input, type InputProps } from '.'
import { IconButton, type IconButtonProps } from '@negative-space/button'

export interface InputPasswordProps extends Omit<
  InputProps,
  'classNames' | 'styles' | 'suffix' | 'type'
> {
  classNames?: InputProps['classNames'] & {
    button?: string
  }
  styles?: InputProps['styles'] & {
    button?: React.CSSProperties
  }
  onToggleVisibility?: (visible: boolean) => void
  buttonProps?: Omit<IconButtonProps, 'onClick' | 'aria-label'>
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ onToggleVisibility, classNames, styles, buttonProps, ...rest }, ref) => {
    const { global } = useNSUI()
    const [visible, setVisible] = React.useState(false)

    const handleToggle = () => {
      setVisible((prev) => {
        const next = !prev
        onToggleVisibility?.(next)
        return next
      })
    }

    return (
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
            onClick={handleToggle}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className={classNames?.button}
            style={styles?.button}
          >
            {visible ? <EyeOff /> : <Eye />}
          </IconButton>
        }
      />
    )
  }
)

InputPassword.displayName = 'InputPassword'
