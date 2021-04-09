import axiosApi from '@/config/api'
import qs from 'qs'
import { ElNotification } from 'element-plus'

const projects = {
  namespaced: true,
  state: () => ({
    listProjects: [],
    selectProject: {},
    modal: false
  }),
  mutations: {
    changeSelectProject: (state, project) => { state.selectProject = project },
    changeListProjects: (state, projects) => { state.listProjects = projects },
    changeModalStatus: (state, modal) => { state.modal = modal }
  },
  actions: {
    Init: ({ commit }) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'project/list').then(response => {
        commit('changeListProjects', response.data.data)
        commit('changeSelectProject', {})
        commit('changeModalStatus', false)
      }).catch(err => {
        console.log(err.response)
      })
    },
    setSelect: ({ commit }, project) => commit('changeSelectProject', project),
    createProject: ({ commit, dispatch }, project) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'project/create/', qs.stringify(
        project
      )).then(() => {
        dispatch('Init')
        commit('changeModalStatus', false)
        ElNotification({
          title: 'Correcto',
          message: 'El proyecto se ha creado.',
          type: 'success'
        })
      }).catch((error) => {
        console.log('error: ', error.response.data.error)
      })
    },
    deleteProject: ({ dispatch }, project) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'project/delete/', qs.stringify({
        name: project.name
      })).then(() => {
        ElNotification({
          title: 'Correcto',
          message: 'El proyecto se ha borrado.',
          type: 'success'
        })
        dispatch('Init')
      }).catch(err => console.log(err.response.data.error))
    },
    changeProject: ({ dispatch }, project) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'project/change/', qs.stringify(
        project
      )).then(() => {
        ElNotification({
          title: 'Correcto',
          message: 'El proyecto se ha actualizado.',
          type: 'success'
        })
        dispatch('Init')
      }).catch((error) => {
        console.log('error: ', error.response)
      })
    },
    openModal: ({ commit }) => { commit('changeModalStatus', true) },
    closeModal: ({ commit }) => { commit('changeModalStatus', false) }
  },
  getters: {
    getList: (state) => state.listProjects,
    getSize: (state) => state.listProjects.length,
    getSelect: (state) => state.selectProject,
    getModalStatus: (state) => state.modal
  }
}

export default projects
