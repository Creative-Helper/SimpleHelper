import { unlink } from 'fs'

const deleteFile = (file) => {
  unlink(file, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

export default deleteFile

