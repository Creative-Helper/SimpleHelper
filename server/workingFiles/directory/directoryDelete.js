import {rmdirSync} from 'fs'

const directoryDelete = (path) => {
  return rmdirSync(path, { recursive: true })
}

export default  directoryDelete

