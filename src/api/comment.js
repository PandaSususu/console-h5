import qs from 'qs'

import axios from '@/utils/request'
import store from '@/store'

/**
 * 获取帖子评论列表
 * @param {*}
 */
const getComments = async (tid) => {
  let headers = {}
  if (store.state.isLogin) {
    headers = {
      Authorization: 'Bearer ' + store.state.token
    }
  }
  return axios.get('/public/comments?' + qs.stringify(tid), {
    headers
  })
}

/**
 * 用户发表评论
 * @param {*}
 */
const postComment = async (options) => axios.post('/comment/post', options)

/**
 * 用户修改评论
 * @param {*}
 */
const updateComment = async (options) => axios.post('/comment/update', options)
/**
 * 采纳最佳答案
 * @param {*}
 */
const setBest = async (options) => axios.post('/comment/setBest', options)

/**
 * 点赞评论
 * @param {*}
 */
const setHands = async (cid) => axios.get('/comment/setHands?' + qs.stringify(cid))

export {
  postComment,
  updateComment,
  setBest,
  getComments,
  setHands
}
