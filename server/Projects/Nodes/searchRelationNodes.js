import path from 'path'
import { fileURLToPath } from 'url'
import { directoryVerified } from '../../workingFiles/directoryApi.js'
import { readFileJson, readFiles } from '../../workingFiles/fileApi.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const searchRelationNodes = (app) => {
  app.post(process.env.API_URL + 'project/searchrelationode/', (req, res) => {
    if (!req.body.name) {
      res.setHeader('Content-Type', 'application/json')
      res.json({
        message: "Error",
        status: 400,
        data: {message: 'No hay projecto relacionado' }
      })
      return
    }
    const project = req.body.name
    const parentTemp = __dirname.split(path.sep)
    parentTemp.splice(-1, 1)
    const parent = parentTemp.join(path.sep) + '/Inprocess/'+project+'/'
    if (!directoryVerified(parent)) {
      res.setHeader('Content-Type', 'application/json')
      res.json({
        message: "Error",
        status: 404,
        data: {message: 'No se encuentra el proyecto' }
      })
      return
    }
    let node = {
      nodes: []
    }
    const file = 'nodeRelation.json'
    const files = readFiles(parent)
    const search  = files.find(item => item.name === file )
    if (search) {
      node = readFileJson (parent, file)
    }

    res.setHeader('Content-Type', 'application/json')
    res.json({
      message: "Correcto",
      status: 200,
      data: {node: node.nodes}
    })
  })
}

export default searchRelationNodes
