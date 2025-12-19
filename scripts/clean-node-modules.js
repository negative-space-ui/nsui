import { rm } from 'fs/promises'
import { readdir } from 'fs/promises'
import { join } from 'path'

async function cleanNodeModules(dir) {
  let files
  try {
    files = await readdir(dir, { withFileTypes: true })
  } catch (err) {
    return
  }

  for (const file of files) {
    const fullPath = join(dir, file.name)

    if (file.isDirectory()) {
      if (file.name === 'node_modules') {
        try {
          console.log(`deleting ${fullPath}...`)
          await rm(fullPath, { recursive: true, force: true })
        } catch (err) {}
      } else {
        await cleanNodeModules(fullPath)
      }
    }
  }
}

cleanNodeModules(process.cwd())
  .then(() => console.log('all node_modules deleted'))
  .catch((err) => console.error('error:', err))
