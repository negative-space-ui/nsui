export type ComponentSettings = {
  alert?: Alert
  button?: ButtonSettings
  iconButton?: IconButtonSettings
  closeButton?: CloseButtonSettings
  checkmark?: CheckmarkSettings
  form?: FormSettings
  heading?: HeadingSettings
  inputPassword?: InputPasswordSettings
  link?: LinkSettings
  list?: ListSettings
  modal?: ModalSettings
  popover?: PopoverSettings
  radio?: RadioSettings
  select?: SelectSettings
  skeleton?: SkeletonSettings
  spinner?: SpinnerSettings
  text?: TextSettings
}

export type ClickableAnimation = 'ripple' | 'none'
export type OverlayAnimation = 'fade' | 'fade-scale' | 'pop' | 'none'

export type ValidationMode = 'onBlur' | 'onChange' | 'onSubmit' | 'all'

export type PolymorphicElement =
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
  | 'a'
  | 'ol'
  | 'ul'
  | 'li'
  | 'dl'
  | 'dt'
  | 'dd'
  | 'button'
  | 'form'

export type PolymorphicElementMap = {
  div: HTMLDivElement
  aside: HTMLElement
  header: HTMLElement
  footer: HTMLElement
  main: HTMLElement
  section: HTMLElement
  nav: HTMLElement
  article: HTMLElement
  label: HTMLLabelElement
  fieldset: HTMLFieldSetElement
  a: HTMLAnchorElement
  ol: HTMLOListElement
  ul: HTMLUListElement
  li: HTMLLIElement
  dl: HTMLDListElement
  dt: HTMLElement
  dd: HTMLElement
  button: HTMLButtonElement
  form: HTMLFormElement
}

export type Alert = {
  closable?: boolean
  closeTitle?: string
}

export type ButtonSettings = {
  type?: 'button' | 'submit'
  animation?: ClickableAnimation
}

export type IconButtonSettings = {
  type?: 'button' | 'submit'
  animation?: ClickableAnimation
}

export type CloseButtonSettings = {
  animation?: ClickableAnimation
}

export type CheckmarkSettings = {
  animation?: OverlayAnimation
}

export type FormSettings = {
  disableSubmitOnError?: boolean
  validationDelay?: number
  validationMode?: ValidationMode
}

export type HeadingSettings = {
  typeElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
}

export type InputPasswordSettings = {
  textTitle?: string
  passwordTitle?: string
}

export type LinkSettings = {
  underline?: boolean
}

export type ListSettings = {
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

export type ModalSettings = {
  closeTitle?: string
}

export type PopoverSettings = {
  animation?: OverlayAnimation
}

export type RadioSettings = {
  animation?: OverlayAnimation
}

export type SelectSettings = {
  animation?: ClickableAnimation
}

export type SkeletonSettings = {
  animationDuration?: number
}

export type SpinnerSettings = {
  animationDuration?: number
}

export type TextSettings = {
  typeElement?: 'span' | 'p' | 'label' | 'small'
}
