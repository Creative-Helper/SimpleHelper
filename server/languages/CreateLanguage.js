import path from 'path'
import { fileURLToPath } from 'url'
import { fileExist, fileRename, writeFileJson } from '../workingFiles/fileApi.js'
import { searchLanguage } from '../languages/languageApi.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const createLanguage = (app) => {
  app.post(process.env.API_URL + 'language/create/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const error = VerifyError(req)
    if (!error.error) {
      const content = {
        name: req.body.name,
        short: req.body.short,
        image: req.body.file
      }
      const parentTemp = __dirname.split(path.sep)
      parentTemp.splice(-1, 1)
      const parent = parentTemp.join(path.sep) + '/uploads/'
      Promise.resolve(fileExist(req.body.file, parent)).then(() => {
        fileRename(req.body.file, parent, __dirname + '/available/flags/')
      })
      writeFileJson(__dirname + '/available/', req.body.short + '.json', content)
      res.end(JSON.stringify({ success: 'success' }))
      return
    }
    res.status(400)
    res.end(JSON.stringify({ error: error.message }))
  })
}

const VerifyError = (req) => {
  let errorReturn = false
  if (!req.body.name) {
    return {
      error: true,
      message: 'Falta el nombre del lenguaje'
    }
  }
  if (!req.body.short) {
    return {
      error: true,
      message: 'Falta el nombre corto del lenguaje'
    }
  }
  if (!req.body.file) {
    return {
      error: true,
      message: 'Falta la imagen del lenguaje'
    }
  }
  if (searchLanguage(req.body.short, req.body.name)) {
    return {
      error: true,
      message: 'El lenguaje ya existe'
    }
  }
  return {
    error: false,
    message: 'No errors'
  }
}

export default createLanguage
