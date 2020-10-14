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

export {
  sign
}
