import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackImage?: string
  name?: string
  backgroundColors?: string[]
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, name, fallbackImage, backgroundColors, ...props }, ref) => {
    const { global, components } = useNSUI()

    const BackgroundColors = backgroundColors ?? components?.avatar?.backgroundColors

    const letter = name?.trim().charAt(0).toUpperCase()

    const backgroundColor =
      !letter || !/[A-Z]/.test(letter)
        ? ''
        : BackgroundColors?.[(letter.charCodeAt(0) - 65) % BackgroundColors.length]

    if (name && !src && !fallbackImage) {
      return (
        <div
          {...props}
          ref={ref}
          className={cn(`${global.prefixCls}-avatar`, className)}
          style={{ backgroundColor }}
        >
          {letter}
        </div>
      )
    }

    if (src || fallbackImage) {
      return (
        <img
          {...props}
          ref={ref}
          className={cn(`${global.prefixCls}-avatar`, className)}
          src={src ?? fallbackImage}
        />
      )
    }

    return null
  }
)
