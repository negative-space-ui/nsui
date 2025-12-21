import { rm } from 'fs/promises'
import { readdir } from 'fs/promises'
import { join } from 'path'

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
}

async function cleanNodeModules(dir) {
  let files
  try {
    files = await readdir(dir, { withFileTypes: true })
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
    return
  }

  for (const file of files) {
    const fullPath = join(dir, file.name)

    if (file.isDirectory()) {
      if (file.name === 'node_modules') {
        try {
          console.log(`${colors.blue}Deleting ${fullPath}...${colors.reset}`)
          await rm(fullPath, { recursive: true, force: true })
          console.log(`${colors.green}Deleted ${fullPath}${colors.reset}`)
        } catch (err) {
          if (err.code !== 'ENOENT') {
            console.error(`${colors.red}Error deleting ${fullPath}: ${err}${colors.reset}`)
            throw err
          } else {
            console.log(`${colors.yellow}Warning: ${fullPath} not found${colors.reset}`)
          }
        }
      } else {
        await cleanNodeModules(fullPath)
      }
    }
  }
}

cleanNodeModules(process.cwd())
  .then(() => console.log(`${colors.green}All node_modules deleted${colors.reset}`))
  .catch((err) => console.error(`${colors.red}Error: ${err}${colors.reset}`))
