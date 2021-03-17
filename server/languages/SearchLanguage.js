import path from 'path'
import { fileURLToPath } from 'url'
import { readFiles } from '../workingFiles/fileApi.js'
import { filesToJson } from './utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const searchLanguage = (short, name = null) => {
  const files = readFiles(path.resolve(__dirname,  './available/'))
  const fileNames = filesToJson(files)
  if (name) {
    const resultName = searchLanguageForName(name, fileNames)
    const resultShort = searchLanguageForShort(short, fileNames)
    if (resultName) {
      return true
    }
    return resultShort

  }
  return searchLanguageForShort(short, fileNames)
}

const searchLanguageForShort = (short,fileNames ) => {
  const filterShort = fileNames.filter(item => item.short === short)
  return filterShort.length > 0
}

const searchLanguageForName = (name, fileNames) => {
  const filterName = fileNames.filter(item => item.name === name)
  return filterName.length > 0
}

export default searchLanguage
