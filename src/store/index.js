import Vue from 'vue'
import Vuex from 'vuex'

import WebSocket from '@/utils/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    userInfo: null,
    token: '',
    ws: null,
    msgNum: 0
  },
  mutations: {
    // 新建websocket连接
    initWebSocket(state, config) {
      state.ws = new WebSocket(config)
      state.ws.initWs()
    },
    // 断开websocket连接
    closeWebSocket(state) {
      state.ws.onClose()
    },
    // 设置验证码唯一标识
    setSid(state, value) {
      state.sid = value
    },
    // 保存用户信息
    setUserInfo(state, value) {
      state.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    // 保存token
    setUserToken(state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
    },
    // 设置登陆状态
    setLoginStatus(state, value) {
      state.isLogin = value
    },
    // 设置未读消息数
    setMsgTotal(state, value) {
      state.msgNum = value
    }
  },
  actions: {
    msgTotal: ({ commit }, value) => {
      commit('setMsgTotal', value)
    }
  },
  modules: {
  }
})
