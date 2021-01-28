import qs from 'qs'

import axios from '@/utils/request'
import store from '@/store'

/**
 * 发表新帖
 * @param {*}
 */
const addPost = async option => axios.post('/post/add', option)

/**
 * 更新帖子
 * @param {*}
 */
const updatePost = async option => axios.post('/post/update', option)

/**
 * 获取帖子列表
 * @param {*} options 获取帖子列表参数
 */
const getList = async options => {
  return axios.get('/public/list?' + qs.stringify(options))
}

/**
 * 获取置顶帖子
 * @param {*}
 */
const getTopList = async () => axios.get('/public/topList')

/**
 * 获取帖子详情
 * @param {*}
 */
const getDetail = async tid => {
  let headers = {}
  if (store.state.isLogin) {
    headers = {
      Authorization: 'Bearer ' + store.state.token
    }
  }
  return axios.get('/public/post/detail?' + qs.stringify(tid), {
    headers
  })
}

/**
 * 获取用户帖子
 * @param {*}
 */
const getUserPosts = async () => axios.get('/post/list')

/**
 * 获取用户收藏帖子
 * @param {*}
 */
const getUserCollerctPosts = async () => axios.get('/post/collections')

/**
 * 用户收藏帖子
 * @param {*}
 */
const collectPost = async tid =>
  axios.get('/post/collect', {
    params: {
      tid
    }
  })

export { getList, getTopList, getDetail, addPost, getUserPosts, collectPost, getUserCollerctPosts, updatePost }
