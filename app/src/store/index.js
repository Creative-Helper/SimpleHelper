import { createStore } from 'vuex'
import language from './modules/language'
import nodes from './modules/nodes'

export default createStore({
  modules: {
    language,
    nodes
  }
})
