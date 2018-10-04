import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    general: {
      showLoginContainer: true,
      /**
       * the picked news item for display (since the pick might come from any possible component;
       * hence saving this item to the store is a good idea)
       */
      pickedNewsItem: null
    },
    searchbar: {
      newsItems: null
    }
  },
  mutations: {
    setShowLoginContainer (state, flag) {
      state.general.showLoginContainer = flag
    },
    setSearchbarNewsItems (state, items) {
      state.searchbar.newsItems = items
    },
    setPickedNewsItem (state, item) {
      state.general.pickedNewsItem = item
    }
  }
})
