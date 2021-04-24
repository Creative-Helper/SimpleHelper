import {rmSync} from 'fs'

const directoryDelete = (path) => {
  return rmSync(path, { recursive: true })
}

export default  directoryDelete

