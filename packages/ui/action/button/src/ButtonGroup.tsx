import React from 'react'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import { Flex, type FlexProps } from '@negative-space/flex'
import { Button, type ButtonProps } from './Button'
import { IconButton, type IconButtonProps } from './IconButton'
import { ButtonContext } from './ButtonContext'

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
              return (
                <Button
                  key={index}
                  controlled
                  classNames={mergeCn(classNames?.button, item.button.classNames)}
                  styles={{ ...styles?.button, ...item.button.styles }}
                  {...item.button}
                />
              )
            }

            if ('iconButton' in item) {
              return (
                <IconButton
                  key={index}
                  controlled
                  className={cn(classNames?.iconButton, item.iconButton.className)}
                  style={{ ...styles?.iconButton, ...item.iconButton.style }}
                  {...item.iconButton}
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
