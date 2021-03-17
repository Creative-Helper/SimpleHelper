import {readdirSync} from 'fs'

const readFiles = (route) => {
  const files = readdirSync(route, { withFileTypes: true })
  if (files) {
    return files.filter(item => item.isFile())
  }
  return files
}

export default readFiles
