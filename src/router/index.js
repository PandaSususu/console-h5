import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt from 'jsonwebtoken'
import moment from 'moment'

import Home from '@/views/Home'
import store from '../store'

Vue.use(VueRouter)

const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '../views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ '../views/channels/Index.vue')
const Page1 = () => import(/* webpackChunkName: 'page1' */ '../views/channels/Page1.vue')
const Center = () => import(/* webpackChunkName: 'center' */ '../views//Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'userCenter' */ '../components/user/Center.vue')
const UserMessage = () => import(/* webpackChunkName: 'userMessage' */ '../components/user/Message.vue')
const UserOther = () => import(/* webpackChunkName: 'UuserOther' */ '../components/user/Other.vue')
const UserPosts = () => import(/* webpackChunkName: 'userPosts' */ '../components/user/Posts.vue')
const UserSetting = () => import(/* webpackChunkName: 'userSetting' */ '../components/user/Setting.vue')
const User = () => import(/* webpackChunkName: 'user' */ '../views/User.vue')
const MyInfo = () => import(/* webpackChunkName: 'myInfo' */ '../components/user/common/MyInfo.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */ '../components/user/common/Accounts.vue')
const ModifyPassword = () => import(/* webpackChunkName: 'modifyPassword' */ '../components/user/common/ModifyPassword.vue')
const PicUpload = () => import(/* webpackChunkName: 'picUpload' */ '../components/user/common/PicUpload.vue')
const MyPost = () => import(/* webpackChunkName: 'myPost' */ '../components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'myCollection' */ '../components/user/common/MyCollection.vue')

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Page1
      }
    ]
  },
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
  },
  {
    path: '/center',
    component: Center,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'center',
        component: UserCenter
      },
      {
        path: 'message',
        name: 'message',
        component: UserMessage
      },
      {
        path: 'other',
        name: 'other',
        component: UserOther
      },
      {
        path: 'posts',
        component: UserPosts,
        children: [
          {
            path: '',
            name: 'posts',
            component: MyPost
          },
          {
            path: 'collection',
            name: 'collection',
            component: MyCollection
          }
        ]
      },
      {
        path: 'setting',
        component: UserSetting,
        children: [
          {
            path: '',
            name: 'setting',
            component: MyInfo
          },
          {
            path: 'accounts',
            name: 'accounts',
            component: Accounts
          },
          {
            path: 'password',
            name: 'password',
            component: ModifyPassword
          },
          {
            path: 'picupload',
            name: 'picupload',
            component: PicUpload
          }
        ]
      }
    ]
  },
  {
    path: '/user:uid',
    name: 'user',
    component: User,
    props: true
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem('userInfo')
  const token = localStorage.getItem('token')
  if (userInfo && token) {
    const payload = jwt.decode(token)
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setUserInfo', { userJson: JSON.parse(userInfo), token: token })
      store.commit('setLoginStatus', true)
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
