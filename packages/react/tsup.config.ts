import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/*/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'esnext',
  splitting: false,
  treeshake: true
})
