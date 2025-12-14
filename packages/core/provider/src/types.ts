export type Components = 'button'

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
   * Defaults to `false`.
   */
  isRippleDisabled?: boolean
}

export type SpinnerConfig = {
  animationDuration?: number
}

export type NSUIComponentsConfig = {
  button?: ButtonConfig
  spinner?: SpinnerConfig
}

export type NSUIComponentsConfigRequired = Required<NSUIComponentsConfig>
