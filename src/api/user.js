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
const updateInfo = async (options) => {
  return axios.post('/user/basic', options)
}

/**
 * 修改用户邮件账户
 * @param {*}
 */
const updateEmail = async (options) => {
  return axios.get('/public/resetEmail?' + qs.stringify(options))
}

/**
 * 获取用户帖子
 * @param {*}
 */
const getUserPosts = async () => {
  return axios.get('/user/list')
}

/**
 * 用户发表评论
 * @param {*}
 */
const postComments = async (options) => {
  return axios.post('/user/comment', options)
}

export {
  sign,
  updateInfo,
  updateEmail,
  getUserPosts,
  postComments
}
