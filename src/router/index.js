import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('../views/Login.vue')
const Reg = () => import('../views/Reg.vue')
const Forget = () => import('../views/Forget.vue')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  }
]

const router = new VueRouter({
  routes
})

export default router
