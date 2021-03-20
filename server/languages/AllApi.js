import searchFiles from './searchFiles.js'

const allLanguagesApi= (app) => {
  app.get(process.env.API_URL + 'languages', (req, res) => {
    const names = searchFiles()
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(names));
  })
}

export default allLanguagesApi
