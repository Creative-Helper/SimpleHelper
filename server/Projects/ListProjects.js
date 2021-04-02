import { readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileJson } from '../workingFiles/fileApi.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ListProjects = (app) => {
  app.post(process.env.API_URL + 'project/list/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const files = readdirSync(__dirname + '/Inprocess/', { withFileTypes: true })
    if (files) {
      const folders = files.filter(item => item.isDirectory())
      const profiles = []
      folders.forEach(item => {
        profiles.push(readFileJson(__dirname + '/Inprocess/' + item.name + '/', 'profile.json'))
      })
      res.json({ data: profiles })
      return
    }
    res.json({ data: files })
  })
}

export default ListProjects

