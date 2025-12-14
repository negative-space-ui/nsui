#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { execSync } from 'child_process'

function questionAsync(rl, question) {
  return new Promise((resolve) => rl.question(question, (answer) => resolve(answer)))
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const inputPath = await questionAsync(rl, 'enter the path from the root/packages: ')
  rl.close()

  const rootDir = process.cwd()
  const packagesRoot = path.join(rootDir, 'packages')
  const fullPath = path.join(packagesRoot, inputPath)
  const folderName = path.basename(fullPath)
  const packageName = `@negative-space/${folderName}`

  createFolders(fullPath)
  createSrcIndex(fullPath)
  createTsConfig(fullPath, inputPath)
  createTsupConfig(fullPath)
  createPackageJson(fullPath, folderName, inputPath)
  createReadme(fullPath, folderName)

  console.log(`package "${folderName}" created at: ${fullPath}`)

  runPnpmInstall(rootDir, packageName)
}

function runPnpmInstall(rootDir, packageName) {
  console.log(`running pnpm install for ${packageName}...`)

  execSync(`pnpm install --filter ${packageName}...`, {
    cwd: rootDir,
    stdio: 'inherit'
  })
}

function createFolders(fullPath) {
  fs.mkdirSync(fullPath, { recursive: true })
}

function createSrcIndex(fullPath) {
  const srcPath = path.join(fullPath, 'src')
  fs.mkdirSync(srcPath, { recursive: true })
  fs.writeFileSync(path.join(srcPath, 'index.ts'), '', 'utf-8')
}

function createTsConfig(fullPath, inputPath) {
  const depth = inputPath.split('/').filter(Boolean).length
  const tsconfigContent = {
    extends: `${'../'.repeat(depth)}../tsconfig.json`,
    compilerOptions: {
      outDir: 'dist',
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      noEmit: false,
      incremental: false
    },
    include: ['src']
  }

  fs.writeFileSync(
    path.join(fullPath, 'tsconfig.json'),
    JSON.stringify(tsconfigContent, null, 2),
    'utf-8'
  )
}

function createTsupConfig(fullPath) {
  const tsupContent = `import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', '!src/scripts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'esnext',
  splitting: false,
  treeshake: true
})
`
  fs.writeFileSync(path.join(fullPath, 'tsup.config.ts'), tsupContent, 'utf-8')
}

function createPackageJson(fullPath, folderName, inputPath) {
  const packageContent = {
    name: `@negative-space/${folderName}`,
    version: '0.0.0',
    description: '',
    keywords: [],
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'git+https://github.com/matheusbastani/nsui',
      directory: `packages/${inputPath}`
    },
    main: 'src/index.ts',
    types: 'src/index.ts',
    files: ['dist'],
    scripts: {
      build: 'tsup',
      clean: 'rimraf dist .turbo',
      dev: 'tsup --watch',
      lint: 'eslint . --ext ts,tsx'
    },
    dependencies: {
      clsx: '^2.1.1'
    },
    devDependencies: {
      '@types/react': '^19.2.7',
      react: '^19.2.1',
      typescript: '^5.9.3'
    }
  }

  fs.writeFileSync(
    path.join(fullPath, 'package.json'),
    JSON.stringify(packageContent, null, 2),
    'utf-8'
  )
}

function createReadme(fullPath, folderName) {
  const readmeContent = `# @negative-space/${folderName}

DESCRIPTION

## Installation

    yarn add @negative-space/${folderName}
    # or
    npm i @negative-space/${folderName}

## License

This project is licensed under the terms of the
[MIT license](https://github.com/nsui-inc/nsui/blob/master/LICENSE).
`
  fs.writeFileSync(path.join(fullPath, 'README.md'), readmeContent, 'utf-8')
}

main()
