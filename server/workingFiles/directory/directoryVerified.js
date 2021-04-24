import {existsSync} from 'fs'

const directoryVerified = (path) => {
  return existsSync(path)
}

export default directoryVerified

