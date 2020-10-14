import axios from '@/utils/request'
import store from '../store'

const header = {
  Authorization: 'Bearer ' + store.state.token,
  'Content-Type': 'application/json'
}

/**
 * 用户签到
 * @param {*}
 */
const sign = async () => {
  return axios.get('/user/sign', { headers: header })
}

export {
  sign
}
