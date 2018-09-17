import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

// service
import TypeService from './service/TypeService'
import FirebaseServiceFx from './service/FirebaseService'

// import static resource(s)
import 'mdbootstrap/css/bootstrap.min.css'
import 'mdbootstrap/css/mdb.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/newsfeed-common.css'

// ** add back this app.config.json file based on the
// apiKey values from your firebase project **
import configFile from './assets/app.config.json'

// set the middleware(s)
// Vue.use(BootstrapVue)

// setup service(s) / util(s) which is not a vue file
window.TypeService = TypeService
window.FirebaseService = FirebaseServiceFx(configFile, firebase)
window.FirebaseService.init()

Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
