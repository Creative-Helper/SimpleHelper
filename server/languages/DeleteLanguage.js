import path from 'path'
import { fileURLToPath } from 'url'
import { readFileJson,  deleteFile } from '../workingFiles/fileApi.js'
import searchFiles from './searchFiles.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const deleteLanguage = (app) => {
  app.post(process.env.API_URL + 'language/delete/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    if (!req.body.short) {
      res.status(400)
      res.end(JSON.stringify({ error: 'Falta la referencia para borrar el lenguaje' }))
      return
    }
    const fileNames = searchFiles()
    const filterShort = fileNames.find(item => item.short === req.body.short)
    if (!filterShort) {
      res.status(400)
      res.end(JSON.stringify({ error: 'No se ha encontrado el lenguaje' }))
      return
    }
    const url = filterShort.url
    const image = readFileJson(url,'').image
    deleteFile(__dirname + '/available/flags/' + image)
    deleteFile(url)
   res.end(JSON.stringify({ success: 'success' }))

  })
}

export default deleteLanguage
