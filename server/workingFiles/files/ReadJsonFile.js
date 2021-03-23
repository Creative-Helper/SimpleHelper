import { readFileSync } from 'fs'

const readFileJson = (path, file) => {
  const fileJson = readFileSync(path + file)
  return JSON.parse(fileJson.toString('utf8'))
}

export default readFileJson
