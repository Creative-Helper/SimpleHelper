import axiosApi from '@/config/api.js'
import qs from 'qs'

const nodes = {
  namespaced: true,
  state: () => ({
    nodesList: []
  }),
  mutations: {
    updateNodes: (state, nodes) => { state.nodesList = nodes }
  },
  actions: {
    addNode: ({ commit }, node) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'project/addnode/', qs.stringify(
        node
      )).then((result) => {
        commit('updateNodes', result.data)
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