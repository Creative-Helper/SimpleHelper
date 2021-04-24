import path from 'path'
import { fileURLToPath } from 'url'
import {directoryVerified, directoryCreate} from '../workingFiles/directoryApi.js'
import { writeFileJson } from '../workingFiles/fileApi.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const createProject = (app) => {
  app.post(process.env.API_URL + 'project/create/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const {name, title, id, description='', languages, mainLanguage, link='', linkPosition=0} = req.body
    const pathProject = __dirname + '/Inprocess/' +name
    if (directoryVerified(pathProject)) {
      res.status(400)
      res.end(JSON.stringify({ error: 'El proyecto ya existe' }))
       return
    }
    directoryCreate(pathProject)
    directoryCreate(pathProject + '/languages')
    writeFileJson(pathProject, '/profile.json', {
      id, name, title, description, languages, mainLanguage, link, linkPosition
    })
    languages.forEach(item => {
      writeFileJson(pathProject + '/languages/', item.short + '.json', {})
    })
    writeFileJson(pathProject, '/nodes.json', {
      nodes: []
    })
    writeFileJson(pathProject, '/nodeRelation.json', {
      relation: []
    })
    res.json({data: req.body})
  })
}

export default createProject
