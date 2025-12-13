export type Components = 'button'

export type CommonConfig = {
  transitionDuration?: number | undefined
}

export type GlobalConfig = {
  /** Prefix classname for all components.
   *
   * Ex: `nsui-button` */
  prefixCls?: string
  /** Duration in milliseconds for transitions and animations of all components.
   *
   * Defaults to `300ms`. */
  transitionDuration?: number
}

export type GlobalConfigRequired = Required<GlobalConfig>

export interface ButtonConfig extends CommonConfig {
  /** Defines if ripple effect should be disabled
   *
   * Defaults to `false`.
   */
  isRippleDisabled?: boolean
}

export interface SpinnerConfig extends CommonConfig {
  animationDuration?: number
}

export type NSUIComponentsConfig = {
  button?: ButtonConfig
  spinner?: SpinnerConfig
}

export type NSUIComponentsConfigRequired = Required<NSUIComponentsConfig>
