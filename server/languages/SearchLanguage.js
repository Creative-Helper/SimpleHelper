import searchFiles from './searchFiles.js'

const searchLanguage = (short, name = null) => {
  const fileNames = searchFiles()
  if (name) {
    const resultName = searchLanguageForName(name, fileNames)
    const resultShort = searchLanguageForShort(short, fileNames)
    return resultName ? resultName : resultShort

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
