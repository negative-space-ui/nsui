import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import React from 'react'

import { Button, type ButtonProps } from './Button'
import { ButtonContext } from './ButtonContext'
import { IconButton, type IconButtonProps } from './IconButton'

export type ButtonComponent =
  | { button: Omit<ButtonProps, 'controlled'> }
  | { iconButton: Omit<IconButtonProps, 'controlled'> }

export interface ButtonGroupProps extends Omit<FlexProps, 'className' | 'style'> {
  classNames?: {
    root?: string
    button?: ButtonProps['classNames']
    iconButton?: IconButtonProps['classNames']
  }
  styles?: {
    root?: React.CSSProperties
    button?: ButtonProps['styles']
    iconButton?: IconButtonProps['styles']
  }
  disabled?: boolean
  items: ButtonComponent[]
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ classNames, styles, items, disabled, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <ButtonContext.Provider value={{ disabled }}>
        <Flex
          {...props}
          ref={ref}
          className={cn(`${global.prefixCls}-button-group`, classNames?.root)}
          style={styles?.root}
        >
          {items.map((item, index) => {
            if ('button' in item) {
              const { children, ...buttonProps } = item.button

              return (
                <Button
                  key={index}
                  controlled
                  {...buttonProps}
                  classNames={mergeCn(classNames?.button, buttonProps.classNames)}
                  styles={{ ...styles?.button, ...buttonProps.styles }}
                >
                  {children}
                </Button>
              )
            }

            if ('iconButton' in item) {
              return (
                <IconButton
                  key={index}
                  controlled
                  {...item.iconButton}
                  classNames={classNames?.iconButton}
                  styles={styles?.iconButton}
                />
              )
            }
          })}
        </Flex>
      </ButtonContext.Provider>
    )
  }
)

ButtonGroup.displayName = 'ButtonGroup'
