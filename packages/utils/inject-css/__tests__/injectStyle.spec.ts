import { injectStyle } from '..'
import * as styleSheet from '../src/styleSheet'

jest.mock('../src/styleSheet', () => {
  const injected = new Map<string, number>()

  return {
    injected,
    getSheet: jest.fn()
  }
})

function createSheet() {
  return {
    cssRules: [] as unknown as CSSRuleList,
    insertRule: jest.fn(),
    deleteRule: jest.fn()
  } as unknown as CSSStyleSheet
}

describe('injectStyle', () => {
  const getSheet = jest.mocked(styleSheet.getSheet)

  beforeEach(() => {
    styleSheet.injected.clear()
    getSheet.mockReset()
  })

  it('returns the selector when no stylesheet exists', () => {
    getSheet.mockReturnValue(null)

    expect(
      injectStyle('.box', {
        color: 'red'
      })
    ).toBe('.box')
  })

  it('inserts a new rule', () => {
    const sheet = createSheet()

    getSheet.mockReturnValue(sheet)

    injectStyle('.box', {
      color: 'red'
    })

    expect(sheet.insertRule).toHaveBeenCalledWith('.box { color: red; }', 0)

    expect(styleSheet.injected.get('.box')).toBe(0)
  })

  it('replaces an existing rule', () => {
    const sheet = createSheet()

    Object.defineProperty(sheet, 'cssRules', {
      value: [{}, {}, {}]
    })

    styleSheet.injected.set('.box', 2)

    getSheet.mockReturnValue(sheet)

    injectStyle('.box', {
      color: 'blue'
    })

    expect(sheet.deleteRule).toHaveBeenCalledWith(2)
    expect(sheet.insertRule).toHaveBeenCalledWith('.box { color: blue; }', 2)
  })

  it('trims the selector before storing it', () => {
    const sheet = createSheet()

    getSheet.mockReturnValue(sheet)

    injectStyle('  .box  ', {
      color: 'red'
    })

    expect(styleSheet.injected.has('.box')).toBe(true)
  })
})
