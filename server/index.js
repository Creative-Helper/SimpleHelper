import express from 'express'
import {
  allLanguagesApi,
  languageForShort,
  createLanguage,
  deleteLanguage,
  changeLanguage
} from './languages/languageApi.js'
import {uploadFileGeneral} from './workingFiles/fileApi.js'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

allLanguagesApi(app)
languageForShort(app)
createLanguage(app)
uploadFileGeneral(app)
deleteLanguage(app)
changeLanguage(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
