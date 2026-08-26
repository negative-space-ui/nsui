import { Button, type ButtonProps } from '@negative-space/button'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type ToggleProps = ButtonProps & {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    { classNames, animation, pressed = false, children, onClick, onPressedChange, ...props },
    ref
  ) => {
    const { global, components } = useNSUI()

    const Animation = animation ?? components?.toggle?.animation

    const [pressedState, setPressedState] = React.useState(pressed)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setPressedState((prev) => !prev)
      onPressedChange?.(!pressedState)
      onClick?.(event)
    }

    return (
      <Button
        ref={ref}
        {...props}
        animation={Animation}
        data-pressed={pressedState}
        aria-pressed={pressedState}
        onClick={handleClick}
        classNames={{
          ...classNames,
          root: cn(`${global.prefixCls}-toggle`, classNames?.root)
        }}
      >
        {children}
      </Button>
    )
  }
)

Toggle.displayName = 'Toggle'
