import Vue from 'vue'
import Router from 'vue-router'

import NewsFeedLandingPage from './../components/NewsFeedLandingPage'
import NewsFeedItemDetailPage from './../components/NewsFeedItemDetailPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewsFeedLandingPage',
      component: NewsFeedLandingPage
    },
    {
      path: '/itemDetails',
      name: 'NewsFeedItemDetailPage',
      component: NewsFeedItemDetailPage
    }
  ]
})
