import Vue from 'vue'
import Router from 'vue-router'

import NewsFeedLandingPage from './../components/NewsFeedLandingPage'
// import Testing from './../components/testing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewsFeedLandingPage',
      component: NewsFeedLandingPage
    }
  ]
})
