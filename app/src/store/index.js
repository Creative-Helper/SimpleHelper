import { createStore } from 'vuex'
import language from './modules/language'
import nodes from './modules/nodes'
import projects from './modules/projects'

export default createStore({
  modules: {
    language,
    nodes,
    projects
  }
})
