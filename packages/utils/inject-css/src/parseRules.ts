type CSSValue = string | number

export type CSSRules = {
  [property: string]: CSSValue | CSSRules
}

const toKebab = (str: string) => str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

export function parseRules(rules: CSSRules): string {
  return Object.entries(rules)
    .map(([prop, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const selectorOrAt = prop.startsWith(':') || prop.startsWith('@') ? prop : toKebab(prop)

        return `${selectorOrAt} { ${parseRules(value)} }`
      }

      return `${toKebab(prop)}: ${value};`
    })
    .join(' ')
}
