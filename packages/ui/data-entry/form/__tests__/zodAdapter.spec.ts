import { z } from 'zod'

import { zodAdapter } from '../src/adapters/zod'

describe('zodAdaptor', () => {
  it('extracts default values', () => {
    const schema = z.object({
      name: z.string().default('John'),
      age: z.number().default(18)
    })

    const adapter = zodAdapter(schema)

    expect(adapter.initialValues).toEqual({
      name: 'John',
      age: 18
    })
  })

  it('extracts nested object defaults', () => {
    const schema = z.object({
      user: z.object({
        name: z.string().default('John')
      })
    })

    const adapter = zodAdapter(schema)

    expect(adapter.initialValues).toEqual({
      user: {
        name: 'John'
      }
    })
  })

  it('uses fallback values for fields without defaults', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
      active: z.boolean(),
      tags: z.array(z.string())
    })

    const adapter = zodAdapter(schema)

    expect(adapter.initialValues).toEqual({
      name: '',
      age: undefined,
      active: false,
      tags: []
    })
  })

  it('returns empty errors for valid values', () => {
    const schema = z.object({
      name: z.string().min(3)
    })

    const adapter = zodAdapter(schema)

    expect(
      adapter.validate({
        name: 'John'
      })
    ).toEqual({})
  })

  it('returns validation errors', () => {
    const schema = z.object({
      name: z.string().min(3, 'Too short')
    })

    const adapter = zodAdapter(schema)

    expect(
      adapter.validate({
        name: 'Jo'
      })
    ).toEqual({
      name: 'Too short'
    })
  })

  it('keeps only the first error for a field', () => {
    const schema = z.object({
      password: z.string().min(8, 'Too short').regex(/[A-Z]/, 'Missing uppercase')
    })

    const adapter = zodAdapter(schema)

    expect(
      adapter.validate({
        password: ''
      })
    ).toEqual({
      password: 'Too short'
    })
  })

  it('parses valid values', () => {
    const schema = z.object({
      age: z.coerce.number()
    })

    const adapter = zodAdapter(schema)

    expect(
      adapter.parse({
        age: '18'
      } as never)
    ).toEqual({
      age: 18
    })
  })

  it('throws when parse fails', () => {
    const schema = z.object({
      age: z.number()
    })

    const adapter = zodAdapter(schema)

    expect(() =>
      adapter.parse({
        age: '18'
      } as never)
    ).toThrow()
  })
})
