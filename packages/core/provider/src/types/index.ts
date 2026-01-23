export type MotionDurations = {
  /** Duration in milliseconds for transitions and animations of all components.
   *
   * Defaults to `300ms`. */
  color?: number

  /** Duration in milliseconds for transitions and animations of all components.
   *
   * Defaults to `300ms`. */
  scale?: number

  /** Defines the duration of the pop animation.
   *
   * Defaults to `600`. */
  pop?: number

  /** Defines the duration of the ripple animation.
   *
   * Defaults to `600`. */
  ripple?: number
}

export type GlobalConfig = {
  /** Duration in milliseconds for transitions and animations of all components. */
  motionDurations?: MotionDurations

  /** Prefix classname for all components.
   *
   * Ex: `nsui-button` */
  prefixCls?: string
}

export type GlobalConfigRequired = Required<GlobalConfig>

export type ButtonConfig = {
  /** Defines if ripple effect should be disabled
   *
   * Defaults to `false`. */
  isRippleDisabled?: boolean
}

export type CheckboxConfig = {
  /** Defines if animation should be disabled
   *
   * Defaults to `false`. */
  isPopDisabled?: boolean
}

export type CheckmarkConfig = {
  /** Defines if animation should be disabled
   *
   * Defaults to `false`. */
  isPopDisabled?: boolean
}

export type HeadingConfig = {
  /** Defines the type of the heading element.
   *
   * Defaults to `h1`. */
  typeElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
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

export type RadioConfig = {
  /** Defines if the animation should be disabled.
   *
   * Defaults to `false`. */
  isPopDisabled?: boolean
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
  checkbox?: CheckboxConfig
  checkmark?: CheckmarkConfig
  heading?: HeadingConfig
  link?: LinkConfig
  list?: ListConfig
  radio?: RadioConfig
  spinner?: SpinnerConfig
  text?: TextConfig
}

export type ComponentsConfigRequired = Required<ComponentsConfig>
