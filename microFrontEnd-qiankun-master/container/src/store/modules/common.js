export default {
  namespaced: true,
  state: {
    currentApp: '',
  },
  getters: {
    getCurrentApp: state => state.currentApp
  },
  mutations: {
    setCurrentApp: (state, currentApp) => {
      state.currentApp = currentApp
    }
  }
  ,
  actions: {}
}
