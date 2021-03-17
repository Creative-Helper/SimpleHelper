import {readFiles, readFileJson} from '../workingFiles/fileApi.js'
import path from 'path'
import { fileURLToPath } from 'url'
import {filesToJson} from './utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const allLanguagesApi= (app) => {
  app.get(process.env.API_URL + 'languages', (req, res) => {
    const files = readFiles(path.resolve(__dirname,  './available/'))
    const names = filesToJson(files)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(names));
  })
}

export default allLanguagesApi
