import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    general: {
      showLoginContainer: true
    }
  },
  mutations: {
    setShowLoginContainer (state, flag) {
      state.general.showLoginContainer = flag
    }
  }
})
