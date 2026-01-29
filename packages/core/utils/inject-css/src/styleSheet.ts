export const injected = new Map<string, number>()

let styleTag: HTMLStyleElement | null = null

function getOrCreateStyleTag() {
  if (typeof window === 'undefined') return null
  if (!styleTag) {
    styleTag = document.createElement('style')
    document.head.appendChild(styleTag)
  }
  return styleTag
}

export function getSheet(): CSSStyleSheet | null {
  const tag = getOrCreateStyleTag()
  return tag?.sheet || null
}
