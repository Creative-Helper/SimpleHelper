import path from 'path'
import { fileURLToPath } from 'url'
import { directoryVerified } from '../../workingFiles/directoryApi.js'
import { readFileJson, readFiles } from '../../workingFiles/fileApi.js'
import deepClone from '../../Utils/deepClone.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const searchNodesAndRelations = (app) => {
  app.post(process.env.API_URL + 'project/searchnodeandrelation/', (req, res) => {
    if (!req.body.name) {
      res.setHeader('Content-Type', 'application/json')
      res.json({
        message: 'Error',
        status: 400,
        data: { message: 'No hay projecto relacionado' }
      })
      return
    }
    const project = req.body.name
    const parentTemp = __dirname.split(path.sep)
    parentTemp.splice(-1, 1)
    const parent = parentTemp.join(path.sep) + '/Inprocess/' + project + '/'
    if (!directoryVerified(parent)) {
      res.setHeader('Content-Type', 'application/json')
      res.json({
        message: 'Error',
        status: 404,
        data: { message: 'No se encuentra el proyecto' }
      })
      return
    }
    let node = {
      nodes: []
    }
    let relation = {
      relation: []
    }
    const file = 'nodes.json'
    const file2 = 'nodeRelation.json'
    const files = readFiles(parent)
    const search = files.find(item => item.name === file)
    if (search) {
      node = readFileJson(parent, file)
    }
    const search2 = files.find(item => item.name === file2)
    if (search2) {
      relation = verifyNodesNoRelations(node.nodes, readFileJson(parent, file2).relation)
    }

    res.setHeader('Content-Type', 'application/json')
    res.json({
      message: 'Correcto',
      status: 200,
      data: {
        nodes: node.nodes,
        relations: relation
      }
    })
  })
}

export default searchNodesAndRelations

const verifyNodesNoRelations = (nodes, relations) => {
  let backup = deepClone(relations)
  nodes.forEach(item => {
    let status = false
    relations.forEach(element => {
      if (item.id === element) {
        status = true
      }
      if (!status && element.child) {
        status = idTrueOrFalse(item.id, element.child)
      }
    })
    if (!status) {
      backup.push(item.id)
    }
  })
  return backup
}

const idTrueOrFalse = (id, relations) => {
  let find = false
  relations.forEach(item => {
    if (item === relations) {
      find = true
    }
    if (!find && item.child) {
      find = idTrueOrFalse(id, item.child)
    }
  })
  return find
}
