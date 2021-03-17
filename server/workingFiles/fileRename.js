import {rename} from 'fs'

const fileRename = (file, origin, destiny) => {
  rename(origin + file, destiny + file, (err) => {
    if (err) throw err
    return true
  })
  return false
}


export default fileRename
