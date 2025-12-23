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
  /** Defines the type of the heading element.
   *
   * Defaults to `h1`. */
  typeElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
}

export type ListConfig = {
  /** Defines the direction of the list.
   *
   * Defaults to `vertical`. */
  direction?: 'horizontal' | 'vertical'
  /** Defines the marker of the list.
   *
   * Defaults to `ol`. */
  typeElement?: 'ol' | 'ul'
  /** Defines the marker style of the list.
   *
   * Defaults to `decimal`. */
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
   * Defaults to `disc`. */
  ulMarker?: 'disc' | 'circle' | 'square' | 'none'
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
  heading?: HeadingConfig
  list?: ListConfig
  spinner?: SpinnerConfig
  text?: TextConfig
}

export type ComponentsConfigRequired = Required<ComponentsConfig>
