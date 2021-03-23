import express from 'express'
import {
  allLanguagesApi,
  languageForShort,
  createLanguage,
  deleteLanguage,
  changeLanguage
} from './languages/languageApi.js'
import {uploadFileGeneral} from './workingFiles/fileApi.js'
import {addNode} from './Projects/ProjectApi.js'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import RateLimit from 'express-rate-limit'

dotenv.config()

const app = express()
const port = process.env.PORT
const limiter = new RateLimit({
  windowMs: 60*1000,
  max: 5
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(limiter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

allLanguagesApi(app)
languageForShort(app)
createLanguage(app)
uploadFileGeneral(app)
deleteLanguage(app)
changeLanguage(app)
addNode(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
