import path from 'path'
import { fileURLToPath } from 'url'
import { deleteFile, fileExist, fileRename, readFileJson, readFiles, writeFileJson } from '../workingFiles/fileApi.js'
import searchFiles from './searchFiles.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const changeLanguage = (app) => {
  app.post(process.env.API_URL + 'language/change/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    if (!req.body.old || !req.body.language) {
      res.status(400)
      res.end(JSON.stringify({ error: 'Cabeceras mal montadas' }))
      return
    }
    const oldL = req.body.old
    const newL = req.body.language
    const fileNames = searchFiles()
    const filterShort = fileNames.find(item => item.short === oldL.short)
    const url = filterShort.url
    const image = readFileJson(url,'').image
    const language = VerifyError(oldL, newL)
    const content = {
        name: language.name,
        short: language.short,
      image: image
      }
      if (newL.file) {
        deleteFile(__dirname + '/available/flags/' + image)
        const parentTemp = __dirname.split(path.sep)
        parentTemp.splice(-1, 1)
        const parent = parentTemp.join(path.sep) + '/uploads/'
        Promise.resolve(fileExist(newL.file, parent)).then(() => {
          fileRename(newL.file, parent, __dirname + '/available/flags/')

        })
        content.image = newL.file
      }
      if (oldL.short !== newL.short) {
          deleteFile(url)
      }
      writeFileJson(__dirname + '/available/', language.short + '.json', content)
      res.end(JSON.stringify({ success: 'success' }))
  })
}

const VerifyError = (oldL, newL) => {
  return  {
    name: newL.name ? newL.name  : oldL.name,
    short: newL.short ? newL.short  : oldL.short
  }

}

export default changeLanguage
