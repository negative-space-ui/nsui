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

export type FlexConfig = {
  /** Defines the type of the flex element.
   *
   * Defaults to `div`. */
  typeElement?:
    | 'div'
    | 'aside'
    | 'header'
    | 'footer'
    | 'main'
    | 'section'
    | 'nav'
    | 'article'
    | 'label'
    | 'fieldset'
    | 'ol'
    | 'ul'
    | 'li'
    | 'dl'
    | 'dt'
    | 'dd'
    | 'button'
    | 'form'
  /** Defines the direction of the flex container.
   *
   * Defaults to `row`. */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  /** Defines the wrapping behavior of the flex container.
   *
   * Defaults to `nowrap`. */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  /** Defines the alignment of the flex items.
   *
   * Defaults to `start`. */
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  /** Defines the alignment of the flex items.
   *
   * Defaults to `start`. */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

export type GridConfig = {
  /** Defines the type of the grid element.
   *
   * Defaults to `div`. */
  typeElement?:
    | 'div'
    | 'aside'
    | 'header'
    | 'footer'
    | 'main'
    | 'section'
    | 'nav'
    | 'article'
    | 'label'
    | 'fieldset'
    | 'ol'
    | 'ul'
    | 'li'
    | 'dl'
    | 'dt'
    | 'dd'
    | 'form'
  /** Defines the alignment of the grid items.
   *
   * Defaults to `start`. */
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  /** Defines the alignment of the grid items.
   *
   * Defaults to `start`. */
  justifyItems?: 'start' | 'center' | 'end' | 'stretch'
  /** Defines the alignment of the grid content.
   *
   * Defaults to `start`. */
  alignContent?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly'
  /** Defines the alignment of the grid content.
   *
   * Defaults to `start`. */
  justifyContent?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly'
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
  /** Defines the color of the radio when selected.
   *
   * Defaults to `black`. */
  accentColor?: string
  /** Defines the direction of the radio group.
   *
   * Defaults to `vertical`. */
  direction?: 'horizontal' | 'vertical'
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
  flex?: FlexConfig
  grid?: GridConfig
  heading?: HeadingConfig
  link?: LinkConfig
  list?: ListConfig
  radio?: RadioConfig
  spinner?: SpinnerConfig
  text?: TextConfig
}

export type ComponentsConfigRequired = Required<ComponentsConfig>
