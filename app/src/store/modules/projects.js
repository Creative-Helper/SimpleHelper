import axiosApi from '@/config/api'
import qs from 'qs'

const projects = {
  namespaced: true,
  state: () => ({
    listProjects: [],
    selectProject: {}
  }),
  mutations: {
    changeSelectProject: (state, project) => { state.selectProject = project },
    changeListProjects: (state, projects) => { state.listProjects = projects }
  },
  actions: {
    Init: ({ commit }) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'project/list').then(response => {
        commit('changeListProjects', response.data.data)
        commit('changeSelectProject', {})
      }).catch(err => {
        console.log(err.response)
      })
    },
    setSelect: ({ commit }, project) => commit('changeSelectProject', project),
    createProject: ({ commit }, project) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'project/create/', qs.stringify(
        project
      )).then(() => {
        commit('changeSelectProject', project)
      }).catch((error) => {
        console.log('error: ', error.response.data.error)
      })
    },
    deleteProject: ({ dispatch }, project) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'project/delete/', qs.stringify({
        name: project.name
      })).then(() => {
        dispatch('Init')
      }).catch(err => console.log(err.response.data.error))
    }
  },
  getters: {
    getList: (state) => state.listProjects,
    getSize: (state) => state.listProjects.length,
    getSelect: (state) => state.selectProject
  }
}

export default projects
