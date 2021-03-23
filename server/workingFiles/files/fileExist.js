import {stat} from 'fs'

const fileExist = async (file, folder) => {
  let result = false
  await stat(folder + file, (err) => {
      if (err) {
        console.log('errores: ', err)
        return false
      }
      return true
  })
  return result
}

export default fileExist
