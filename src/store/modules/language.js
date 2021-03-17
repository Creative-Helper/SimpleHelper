import axiosApi from '@/config/api.js'
import qs from 'qs'
import { ElNotification } from 'element-plus'

const language = {
  namespaced: true,
  state: () => ({
    languages: []
  }),
  mutations: {
    changeLanguage: (state, language) => {
      const search = state.languages.findIndex(item => item.short === language.short)
      if (search > -1) {
        state.languages[search] = language
      } else {
        state.languages.push(language)
      }
    },
    removeLanguage: (state, language) => {
      const search = state.languages.findIndex(item => item.short === language.short)
      if (search > -1) {
        state.languages = state.languages.splice(search, 1)
      }
    },
    updateLanguages: (state, languages) => {
      state.languages = languages
    },
    none: (state) => { console.log({ state }) }
  },
  actions: {
    addLanguage: ({ commit }, language) => commit('changeLanguage', language),
    modifyLanguage: ({ commit }, { oldL, newL }) => {
      console.log(oldL, newL)
      axiosApi.post(process.env.VUE_APP_API_URL + 'language/change/', qs.stringify({
        old: {
          name: oldL.name,
          short: oldL.short,
          file: oldL.file
        },
        language: {
          name: newL.name,
          short: newL.short,
          file: newL.file
        }
      })).then((response) => {
        console.log('response: ', response.data)
        commit('none')
        ElNotification({
          title: 'Error',
          message: 'Cambiado el lenguaje: ' + newL.name,
          type: 'success'
        })
      }).catch((error) => {
        const message = error.response
        ElNotification.error({
          title: 'Error',
          message: message.data.error
        })
      })
    },
    deleteLanguage: ({ commit }, language) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'language/delete/', qs.stringify({
        short: language.short
      })).then((response) => {
        console.log('response: ', response.data)
        commit('none')
        ElNotification({
          title: 'Error',
          message: 'Eliminado el lenguaje: ' + language.name,
          type: 'success'
        })
      }).catch((error) => {
        const message = error.response
        ElNotification.error({
          title: 'Error',
          message: message.data.error
        })
      })
    },
    Init: ({ commit }) => {
      axiosApi.get(process.env.VUE_APP_API_URL + 'languages/').then(response => {
        commit('updateLanguages', response.data)
      })
    },
    createLanguage: ({ commit }, language) => {
      axiosApi.post(process.env.VUE_APP_API_URL + 'language/create/', qs.stringify({
        name: language.name,
        short: language.short,
        file: language.file
      })).then((response) => {
        console.log('response: ', response.data)
        commit('none')
      }).catch((error) => {
        const message = error.response
        ElNotification.error({
          title: 'Error',
          message: message.data.error
        })
      })
    }
  },
  getters: {
    getLanguages: (state) => state.languages,
    getLanguage: (state) => (short) => state.languages.filter(item => item.short === short)
  }
}

export default language
