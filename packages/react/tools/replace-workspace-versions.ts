import fs from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve('../../')
const pkgPath = path.resolve('./package.json')

type PackageJson = {
  name: string
  version: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as PackageJson

function getWorkspacePackages(dir: string): Record<string, string> {
  const fullPath = path.join(rootDir, 'packages', dir)
  const packages: Record<string, string> = {}

  for (const subdir of fs.readdirSync(fullPath)) {
    const packagePath = path.join(fullPath, subdir, 'package.json')

    if (!fs.existsSync(packagePath)) continue

    const json = JSON.parse(fs.readFileSync(packagePath, 'utf8')) as PackageJson

    packages[json.name] = json.version
  }

  return packages
}

const workspacePkgs = {
  ...getWorkspacePackages('core'),
  ...getWorkspacePackages('kits')
}

const dependencyTypes = ['dependencies', 'devDependencies', 'peerDependencies'] as const

for (const depType of dependencyTypes) {
  const deps = pkg[depType]

  if (!deps) continue

  for (const [name, version] of Object.entries(deps)) {
    if (!version.startsWith('workspace:')) continue

    const workspaceVersion = workspacePkgs[name]

    if (workspaceVersion) {
      deps[name] = workspaceVersion
      console.log(`Successfully updated ${name} to ${workspaceVersion}`)
    } else {
      console.warn(`Warning: Could not find workspace package for ${name}`)
    }
  }
}

fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
console.log('Updated package.json with workspace versions')
