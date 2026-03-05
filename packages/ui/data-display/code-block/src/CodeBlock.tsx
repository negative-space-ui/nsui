import 'prismjs/themes/prism-tomorrow.css'

import { cn, useNSUI } from '@negative-space/system'
import Prism from 'prismjs'
import React from 'react'

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string
}

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, language = 'javascript', children, ...rest }, ref) => {
    const { global } = useNSUI()
    const internalRef = React.useRef<HTMLPreElement>(null)

    React.useEffect(() => {
      const element = (ref as React.RefObject<HTMLPreElement>)?.current || internalRef.current
      if (element) {
        Prism.highlightAllUnder(element)
      }
    }, [children, ref])

    return (
      <pre
        ref={ref || internalRef}
        className={cn(`${global.prefixCls}-code-block`, className)}
        {...rest}
      >
        <code className={`${global.prefixCls}-code language-${language}`}>{children}</code>
      </pre>
    )
  }
)

CodeBlock.displayName = 'CodeBlock'
