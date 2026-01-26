import fs from 'fs'
import path from 'path'

const rootDir = path.resolve('../../')
const pkgPath = path.resolve('./package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

function getWorkspacePackages(dir) {
  const fullPath = path.join(rootDir, 'packages', dir)
  const packages = {}
  fs.readdirSync(fullPath).forEach((subdir) => {
    const p = path.join(fullPath, subdir, 'package.json')
    if (fs.existsSync(p)) {
      const json = JSON.parse(fs.readFileSync(p, 'utf-8'))
      packages[json.name] = json.version
    }
  })
  return packages
}

const workspacePkgs = {
  ...getWorkspacePackages('core'),
  ...getWorkspacePackages('kits')
}

for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
  if (!pkg[depType]) continue
  for (const dep in pkg[depType]) {
    if (pkg[depType][dep].startsWith('workspace:')) {
      if (workspacePkgs[dep]) {
        pkg[depType][dep] = workspacePkgs[dep]
        console.log(`Successfully updated ${dep} to ${workspacePkgs[dep]}`)
      } else {
        console.warn(`Warning: Could not find workspace package for ${dep}`)
      }
    }
  }
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
console.log('Updated package.json with workspace versions')
