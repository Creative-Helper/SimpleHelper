import axiosApi from '@/config/api.js'
import qs from 'qs'
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
    modifyLanguage: ({ commit }, language) => commit('changeLanguage', language),
    deleteLanguage: ({ commit }, language) => commit('removeLanguage', language),
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
      })
    }
  },
  getters: {
    getLanguages: (state) => state.languages,
    getLanguage: (state) => (short) => state.languages.filter(item => item.short === short)
  }
}

export default language
