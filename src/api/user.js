import qs from 'qs'

import axios from '@/utils/request'

/**
 * 用户签到
 * @param {*}
 */
const sign = async () => {
  return axios.get('/user/sign')
}

/**
 * 修改用户基本信息
 * @param {*}
 */
const updateInfo = async (option) => {
  return axios.post('/user/basic', option)
}

/**
 * 修改用户邮件账户
 * @param {*}
 */
const updateEmail = async (option) => {
  return axios.get('/public/resetEmail?' + qs.stringify(option))
}

export {
  sign,
  updateInfo,
  updateEmail
}
