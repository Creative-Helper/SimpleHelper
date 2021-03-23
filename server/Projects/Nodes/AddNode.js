import path from 'path'
import { fileURLToPath } from 'url'
import { readFileJson, writeFileJson, readFiles } from '../../workingFiles/fileApi.js'

const project = 'temporal'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const addNode = (app) => {
  app.post(process.env.API_URL + 'project/addnode/', (req, res) => {
    const { title, id, description, type} = req.body
    const name = req.body.name ? req.body.name : req.body.id
    let node = {}
    if (type==='close') {
      const {reference, example, output} = req.body
      const link = req.body.link ? req.body.link : 'none'
      node = {
        name, title, id, description, type, reference, example, output, link
      }
    } else {
      node = {
        name,
        title,
        id,
        description,
        type
      }
    }
    const parentTemp = __dirname.split(path.sep)
    parentTemp.splice(-1, 1)
    const parent = parentTemp.join(path.sep) + '/Inprocess/'+project+'/'
    const file = project.toLowerCase() + '.json'
    const files = readFiles(parent)
    const search  = files.find(item => item.name === file )
    if (search) {
      const temp = readFileJson (parent, file)
      temp.nodes.push(node)
      node = temp
    } else {
      node = {
        nodes: [
          node
        ]
      }
    }
    writeFileJson(parent, file, node)
    res.setHeader('Content-Type', 'application/json')
    res.json({
      message: "Correcto",
      status: 200,
      data: {node: node}
    })
  })
}

export default addNode
