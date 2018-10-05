import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      // salt.user.uid => the actual uid for that user (instead of the email)
      salt: null
    },
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
    },
    prefs: {
      record: null
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
    },
    setAuthSalt (state, salt) {
      state.auth.salt = salt
    },
    setPrefsRecord (state, pref) {
      state.prefs.record = pref
    }
  },
  getters: {
    /**
     * return the uid under the valid authentication object
     * @param state
     * @returns {*}
     */
    uid: state => {
      if (state.auth.salt) {
        return state.auth.salt.user.uid
      } else {
        return null
      }
    }
  }
})
