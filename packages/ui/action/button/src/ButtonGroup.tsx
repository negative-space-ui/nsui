import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import React from 'react'

import { Button, type ButtonProps } from './Button'
import { ButtonContext } from './ButtonContext'
import { IconButton, type IconButtonProps } from './IconButton'

export type ButtonComponent =
  | { button: Omit<ButtonProps, 'controlled'> }
  | { iconButton: Omit<IconButtonProps, 'controlled'> }

export interface ButtonGroupProps extends Omit<FlexProps, 'as' | 'className' | 'style'> {
  classNames?: {
    root?: string
    button?: {
      btn?: string
      content?: string
      prefix?: string
      suffix?: string
    }
    iconButton?: string
  }
  styles?: {
    root?: React.CSSProperties
    button?: {
      btn?: React.CSSProperties
      content?: React.CSSProperties
      prefix?: React.CSSProperties
      suffix?: React.CSSProperties
    }
    iconButton?: React.CSSProperties
  }
  disabled?: boolean
  items: ButtonComponent[]
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ items, classNames, styles, disabled, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <ButtonContext.Provider value={{ disabled }}>
        <Flex
          {...props}
          ref={ref}
          className={cn(`${global.prefixCls}-btn-group`, classNames?.root)}
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
                  className={cn(classNames?.iconButton, item.iconButton.className)}
                  style={{ ...styles?.iconButton, ...item.iconButton.style }}
                />
              )
            }

            return null
          })}
        </Flex>
      </ButtonContext.Provider>
    )
  }
)

ButtonGroup.displayName = 'ButtonGroup'
