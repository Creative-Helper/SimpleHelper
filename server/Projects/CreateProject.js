
const createProject = (app) => {
  app.post(process.env.API_URL + 'project/create/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.json({data: req})
  })
}

export default createProject
