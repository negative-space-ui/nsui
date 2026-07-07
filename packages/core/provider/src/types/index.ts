import react from 'react'

export type MotionDurations = {
  fade?: number
  pop?: number
  ripple?: number
  fadeScale?: number
}

export type Colors = {
  error: NonNullable<react.CSSProperties['color']>
}

export type GlobalConfig = {
  colors?: Colors
  motionDurations?: MotionDurations
  prefixCls?: string
  tooltip?: boolean
}

export type GlobalConfigRequired = Required<GlobalConfig>

export type ClickableAnimation = 'ripple' | 'none'
export type OverlayAnimation = 'fade' | 'fade-scale' | 'pop' | 'none'

export type ValidationMode = 'onBlur' | 'onChange' | 'onSubmit' | 'all'

export type Alert = {
  closable?: boolean
  closeTitle?: string
}

export type ButtonConfig = {
  animation?: ClickableAnimation
}

export type IconButtonConfig = {
  animation?: ClickableAnimation
}

export type CloseButton = {
  animation?: ClickableAnimation
}

export type CheckmarkConfig = {
  animation?: OverlayAnimation
}

export type FormConfig = {
  disableSubmitOnError?: boolean
  validationDelay?: number
  validationMode?: ValidationMode
}

export type HeadingConfig = {
  typeElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
}

export type InputPasswordConfig = {
  textTitle?: string
  passwordTitle?: string
}

export type LinkConfig = {
  underline?: boolean
}

export type ListConfig = {
  typeElement?: 'ol' | 'ul'
  olMarker?:
    | 'decimal'
    | 'decimal-leading-zero'
    | 'lower-alpha'
    | 'upper-alpha'
    | 'lower-roman'
    | 'upper-roman'
    | 'none'
  ulMarker?: 'disc' | 'circle' | 'square' | 'none'
}

export type ModalConfig = {
  closeTitle?: string
}

export type PopoverConfig = {
  animation?: OverlayAnimation
}

export type RadioConfig = {
  animation?: OverlayAnimation
}

export type SpinnerConfig = {
  animationDuration?: number
}

export type TextConfig = {
  typeElement?: 'span' | 'p' | 'label' | 'small'
}

export type ComponentsConfig = {
  alert?: Alert
  button?: ButtonConfig
  iconButton?: IconButtonConfig
  closeButton?: CloseButton
  checkmark?: CheckmarkConfig
  form?: FormConfig
  heading?: HeadingConfig
  inputPassword?: InputPasswordConfig
  link?: LinkConfig
  list?: ListConfig
  modal?: ModalConfig
  popover?: PopoverConfig
  radio?: RadioConfig
  spinner?: SpinnerConfig
  text?: TextConfig
}

export type ComponentsConfigRequired = Required<ComponentsConfig>
