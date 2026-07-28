import React, { useContext, useRef } from 'react'

import { FormContext, type FormContextValue, type FormValues } from './FormContext'

function extractValue(e: unknown): unknown {
  if (typeof e === 'object' && e !== null && 'target' in e) {
    const t = (e as { target: HTMLInputElement }).target
    return t.type === 'checkbox' ? t.checked : t.value
  }
  return e
}

function ConnectedField({
  name,
  __type: Component,
  ...props
}: {
  name: string
  __type: React.ElementType
  [key: string]: unknown
}) {
  const ctx = useContext(FormContext)!
  const ctxRef = useRef(ctx)
  ctxRef.current = ctx

  const handlers = useRef({
    onChange: (e: unknown) => ctxRef.current.setValue(name, extractValue(e)),
    onBlur: () => ctxRef.current.handleBlur(name)
  })

  const { validationMode, touched, errors } = ctx
  const showError = validationMode === 'onChange' || validationMode === 'all' || touched[name]

  const error = showError ? errors[name] : undefined

  return (
    <Component
      {...props}
      name={name}
      value={ctx.values[name] ?? ''}
      fieldProps={{
        ...(typeof props.fieldProps === 'object' && props.fieldProps !== null
          ? props.fieldProps
          : {}),
        error
      }}
      onChange={handlers.current.onChange}
      onBlur={handlers.current.onBlur}
    />
  )
}

export function injectFields<T extends FormValues>(
  node: React.ReactNode,
  ctx: FormContextValue<T>,
  disableSubmitOnError: boolean
): React.ReactNode {
  if (!React.isValidElement(node)) return node

  const el = node as React.ReactElement<Record<string, unknown>>
  const { name, children: elChildren } = el.props

  const injectedChildren = elChildren
    ? React.Children.map(elChildren as React.ReactNode, (child) =>
        injectFields(child, ctx, disableSubmitOnError)
      )
    : undefined

  if (disableSubmitOnError && el.props.type === 'submit') {
    return React.cloneElement(el, {
      ...(injectedChildren ? { children: injectedChildren } : {}),
      disabled: Boolean(el.props.disabled) || !ctx.isValid
    })
  }

  if (name && typeof name === 'string') {
    return (
      <ConnectedField
        key={el.key ?? name}
        __type={el.type as React.ElementType}
        {...el.props}
        name={name}
        {...(injectedChildren ? { children: injectedChildren } : {})}
      />
    )
  }

  return injectedChildren ? React.cloneElement(el, { children: injectedChildren }) : node
}
