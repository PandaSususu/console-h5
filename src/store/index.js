import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    userInfo: null,
    token: ''
  },
  mutations: {
    // 设置验证码唯一标识
    setSid(state, value) {
      state.sid = value
    },
    // 保存用户信息
    setUserInfo(state, value) {
      state.userInfo = value.userJson
      state.token = value.token
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      localStorage.setItem('token', state.token)
    },
    // 设置登陆状态
    setLoginStatus(state, value) {
      state.isLogin = value
    }
  },
  actions: {
  },
  modules: {
  }
})
