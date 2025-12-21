export type GlobalConfig = {
  /** Prefix classname for all components.
   *
   * Ex: `nsui-button` */
  prefixCls?: string
  /** Duration in milliseconds for transitions and animations of all components.
   *
   * Defaults to `300ms`. */
  colorTransitionDuration?: number
  /** Duration in milliseconds for transitions and animations of all components.
   *
   * Defaults to `300ms`. */
  scaleTransitionDuration?: number
}

export type GlobalConfigRequired = Required<GlobalConfig>

export type ButtonConfig = {
  /** Defines if ripple effect should be disabled
   *
   * Defaults to `false`. */
  isRippleDisabled?: boolean
}

export type HeadingConfig = {
  typeElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
}

export type ListConfig = {
  /** Defines the direction of the list.
   *
   * Defaults to `vertical`. */
  direction?: 'horizontal' | 'vertical'
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

export type SpinnerConfig = {
  animationDuration?: number
}

export type TextConfig = {
  typeElement?: 'span' | 'p' | 'label' | 'small'
}

export type ComponentsConfig = {
  button?: ButtonConfig
  heading?: HeadingConfig
  list?: ListConfig
  spinner?: SpinnerConfig
  text?: TextConfig
}

export type ComponentsConfigRequired = Required<ComponentsConfig>
