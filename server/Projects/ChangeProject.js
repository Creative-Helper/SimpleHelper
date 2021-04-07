import path from 'path'
import { fileURLToPath } from 'url'
import { directoryVerified } from '../workingFiles/directoryApi.js'
import { writeFileJson, deleteFile } from '../workingFiles/fileApi.js'
import { searchLanguageProject } from './ProjectApi.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const changeProject = (app) => {
  app.post(process.env.API_URL + 'project/change/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const {
      name,
      title,
      id,
      description = '',
      languages,
      mainLanguage,
      link = '',
      linkPosition = 0
    } = req.body
    const pathProject = __dirname + '/Inprocess/' + name
    if (!directoryVerified(pathProject)) {
      res.status(400)
      res.end(JSON.stringify({ error: 'El proyecto no existe' }))
      return
    }
    writeFileJson(pathProject, '/profile.json', {
      id,
      name,
      title,
      description,
      languages,
      mainLanguage,
      link,
      linkPosition
    })
    const languagesInProject = searchLanguageProject(pathProject)
    languages.forEach(item => {
      if (!languagesInProject.includes(item.short)) {
        writeFileJson(pathProject + '/languages/', item.short + '.json', {})
      }
    })
    languagesInProject.forEach(item => {
      let status = false
      languages.forEach(element => {
        if (element.short === item) {
          status = true
        }
      })
      if (!status) {
        deleteFile(pathProject + '/language/' + item + '.json')
      }
    })
    res.json({ data: 'success' })
  })
}

export default changeProject
