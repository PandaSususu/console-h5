import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/veevalidate'
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'
import directives from '@/utils/directives'
import filters from '@/utils/filters'

Vue.config.productionTip = false

Vue.use(Alert)
Vue.use(Pop)

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
