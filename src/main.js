import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import './local/index'

Vue.config.productionTip = false
Vue.use(VeeValidate)
Validator.localize('zh-CN')
axios.defaults.baseURL = (process.env.NODE_ENV !== ' production') ? 'http://localhost:3000' : 'http://www.baidu.com'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
