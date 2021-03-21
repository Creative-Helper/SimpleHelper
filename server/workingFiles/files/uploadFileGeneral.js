import upload from './lib/upload.js'


const uploadFileGeneral= (app) => {
  app.post(process.env.API_URL + 'language/upload/',  (req, res) => {
    const uploadFinal = upload.single('image')
    uploadFinal(req, res, (err) => {
      if(err) {
        res.status(400).send("Something went wrong!")
      }
      res.json({ data: req.file,  code: 200, msg: "OK" })
    })
  })
}

export default uploadFileGeneral
