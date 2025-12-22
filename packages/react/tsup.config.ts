import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/action/index.ts',
    'src/data-display/index.ts',
    'src/feedback/index.ts',
    'src/typography/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'esnext',
  splitting: false,
  treeshake: true
})
