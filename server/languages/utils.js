import { readFileJson } from '../workingFiles/fileApi.js'
import path from 'path'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const filesToJson = (files) => {
  const jsonResponse = []
  if (files && Array.isArray(files)) {
    files.forEach(item => {
      const content = readFileJson(__dirname + '/available/', item.name)
      const itemPath = __dirname + '/available/flags/' + content.image
      const buff = readFileSync(itemPath)
      const { base64data, type } = resolveType (itemPath, buff)
      jsonResponse.push({
        ...content,
        image: base64data,
        url: __dirname + '/available/' + item.name,
        type: type
      })
    })
  }
  return jsonResponse
}

const resolveType = (File, buffer) => {
  const ext = path.extname(File)
  if (ext === '.svg') {
    return {
      base64data: buffer.toString('utf8'),
      type: 'text'
    }
  }
  return {
    base64data: 'data:image/png;base64,' + buffer.toString('base64'),
    type: 'image'
  }
}

export { filesToJson }


