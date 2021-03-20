import searchFiles from './searchFiles.js'

const languageForShort= (app) => {
  app.get(process.env.API_URL + 'language/:short', (req, res) => {
    const names = searchFiles()
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(names.filter(item => item.short === req.params.short)));
  })
}

export default languageForShort
