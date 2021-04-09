import { readFiles } from '../workingFiles/fileApi.js'
import path from 'path'

const searchLanguageProject = (pathProject) => {
  const files = readFiles(path.resolve(pathProject +  '/languages/'))
  const filesNames = []
  files.forEach(item => {
    filesNames.push(item.name.split('.')[0])
  })
  return filesNames
}

export default searchLanguageProject
