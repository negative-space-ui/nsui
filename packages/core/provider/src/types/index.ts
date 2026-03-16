export type MotionDurations = {
  /** Defines the duration of the fade animation.
   *
   * Defaults to `300`. */
  fade?: number
  /** Defines the duration of the pop animation.
   *
   * Defaults to `600`. */
  pop?: number

  /** Defines the duration of the ripple animation.
   *
   * Defaults to `600`. */
  ripple?: number
  /** Defines the duration of the fade-scale animation.
   *
   * Defaults to `400`. */
  fadeScale?: number
}

export type Colors = {
  error?: string
}

export type GlobalConfig = {
  /** Global colors. */
  colors?: Colors
  /** Duration in milliseconds for animations of all components. */
  motionDurations?: MotionDurations
  /** Prefix classname for all components.
   *
   * Ex: `nsui-button` */
  prefixCls?: string
  /** Defines if it should render the tooltip.
   *
   * Defaults to `true`. */
  tooltip?: boolean
}

export type GlobalConfigRequired = Required<GlobalConfig>

export type ClickableAnimation = 'ripple' | 'none'
export type OverlayAnimation = 'fade' | 'fade-scale' | 'pop' | 'none'

export type ValidationMode = 'onBlur' | 'onChange' | 'onSubmit' | 'all'

export type ButtonConfig = {
  /** Defines the animation of the button.
   *
   * Defaults to `ripple`. */
  animation?: ClickableAnimation
}

export type IconButtonConfig = {
  /** Defines the animation of the icon button.
   *
   * Defaults to `ripple`. */
  animation?: ClickableAnimation
}

export type CheckmarkConfig = {
  /** Defines the animation of the checkmark.
   *
   * Defaults to `fade`. */
  animation?: OverlayAnimation
}

export type FormConfig = {
  validationDelay?: number
  validationMode?: ValidationMode
}

export type HeadingConfig = {
  /** Defines the type of the heading element.
   *
   * Defaults to `h1`. */
  typeElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
}

export type InputPasswordConfig = {
  textTitle?: string
  passwordTitle?: string
}

export type LinkConfig = {
  /** Defines if the link should be underlined.
   *
   * Defaults to `false`. */
  underline?: boolean
}

export type ListConfig = {
  /** Defines the marker of the list.
   *
   * Defaults to `ol`. */
  typeElement?: 'ol' | 'ul'
  /** Defines the marker style of the list.
   *
   * Defaults to `none`. */
  olMarker?:
    | 'decimal'
    | 'decimal-leading-zero'
    | 'lower-alpha'
    | 'upper-alpha'
    | 'lower-roman'
    | 'upper-roman'
    | 'none'
  /** Defines the marker style of the list.
   *
   * Defaults to `none`. */
  ulMarker?: 'disc' | 'circle' | 'square' | 'none'
}

export type ModalConfig = {
  closeTitle?: string
}

export type PopoverConfig = {
  /** Defines the animation of the popover.
   *
   * Defaults to `fade-scale`. */
  animation?: OverlayAnimation
}

export type RadioConfig = {
  /** Defines the animation of the radio.
   *
   * Defaults to `fade`. */
  animation?: OverlayAnimation
}

export type SpinnerConfig = {
  /** Defines the animation duration of the spinner.
   *
   * Defaults to `1.2`. */
  animationDuration?: number
}

export type TextConfig = {
  /** Defines the type of the text element.
   *
   * Defaults to `span`. */
  typeElement?: 'span' | 'p' | 'label' | 'small'
}

export type ComponentsConfig = {
  button?: ButtonConfig
  iconButton?: IconButtonConfig
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
