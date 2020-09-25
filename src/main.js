import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/veevalidate'
import Alert from './components/modules/alert'

Vue.config.productionTip = false

axios.defaults.baseURL = (process.env.NODE_ENV !== ' production') ? 'http://localhost:3000' : 'http://www.baidu.com'

Vue.use(Alert)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
