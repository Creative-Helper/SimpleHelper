import { readFiles } from '../workingFiles/fileApi.js'
import path from 'path'
import { filesToJson } from './utils.js'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const searchFiles = () => {
  const files = readFiles(path.resolve(__dirname,  './available/'))
  return filesToJson(files)
}

export default searchFiles
