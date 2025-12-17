export const styleTag = document.createElement('style')
document.head.appendChild(styleTag)

export const injected = new Map<string, number>()

export function getSheet() {
  return styleTag.sheet
}
