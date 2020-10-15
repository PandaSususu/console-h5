import axios from '@/utils/request'
import store from '../store'

/**
 * 用户签到
 * @param {*}
 */
const sign = async () => {
  const headers = {
    Authorization: 'Bearer ' + store.state.token,
    'Content-Type': 'application/json'
  }
  return axios.get('/user/sign', { headers })
}

/**
 * 修改用户基本信息
 * @param {*}
 */
const updateInfo = async (option) => {
  return axios.post('/user/basic', option)
}

export {
  sign,
  updateInfo
}
