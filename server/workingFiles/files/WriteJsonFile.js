import { writeFileSync } from 'fs'

const writeFileJson = (path, file, content) => {
 try {
   writeFileSync(path + file, JSON.stringify(content))
   return true
 } catch (err) {
   console.error(err)
   return false
 }
}

export default writeFileJson

