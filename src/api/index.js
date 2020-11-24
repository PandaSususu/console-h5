import qs from 'qs'

import axios from '@/utils/request'

/**
 * 获取帖子列表
 * @param {*} options 获取帖子列表参数
 */
const getList = async (options) => {
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
const getDetail = async (tid) => {
  return axios.get('/public/post/detail?' + qs.stringify(tid))
}

/**
 * 获取帖子评论列表
 * @param {*}
 */
const getComments = async (tid) => axios.get('/public/post/comments?' + qs.stringify(tid))

/**
 * 获取本周热议
 * @param {*}
 */
const getTopWeek = async () => axios.get('/public/topWeek')

/**
 * 获取温馨通道
 * @param {*}
 */
const getTips = async () => axios.get('/public/tips')

/**
 * 获取友情链接
 * @param {*}
 */
const getLinks = async () => axios.get('/public/links')

/**
 * 获取推荐课程
 * @param {*}
 */
const getAds = async () => axios.get('/public/ads')

export {
  getList,
  getTopWeek,
  getTips,
  getLinks,
  getAds,
  getTopList,
  getDetail,
  getComments
}
