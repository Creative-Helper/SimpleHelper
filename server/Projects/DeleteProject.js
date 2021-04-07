import path from 'path'
import { fileURLToPath } from 'url'
import { directoryVerified, directoryDelete } from '../workingFiles/directoryApi.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const deleteProject = (app) => {
  app.post(process.env.API_URL + 'project/delete/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const name = req.body.name
    if (!name) {
      res.status(400)
      res.end(JSON.stringify({ error: 'No se ha enviado el nombre del proyecto' }))
      return
    }
    const pathProject = __dirname + '/Inprocess/' + name
    if (!directoryVerified(pathProject)) {
      res.status(400)
      res.end(JSON.stringify({ error: 'No existe el proyecto' }))
      return
    }
    res.json({data: directoryDelete(pathProject)})
  })
}

export default deleteProject
