import axiosApi from '@/config/api.js'
import qs from 'qs'

const nodes = {
  namespaced: true,
  state: () => ({
    nodesList: [],
    relations: []
  }),
  mutations: {
    updateNodes: (state, nodes) => { state.nodesList = nodes },
    updateRelations: (state, relations) => {
      state.relations = relations
    }
  },
  actions: {
    Init: ({ commit }, project) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'project/searchnodeandrelation/', qs.stringify(
        project
      )).then((result) => {
        commit('updateNodes', result.data.data.nodes)
        commit('updateRelations', result.data.data.relations)
        console.log(result.data.data)
      }).catch((error) => {
        console.log(error.message)
      })
    },
    addNode: ({ commit }, node) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'project/addnode/', qs.stringify(
        node
      )).then((result) => {
        commit('updateNodes', result.data.data.node)
      }).catch((error) => {
        console.log(error.message)
      })
    }
  },
  getters: {
    getList: (state) => state.nodesList,
    getSize: (state) => state.nodesList.length
  }
}

export default nodes
