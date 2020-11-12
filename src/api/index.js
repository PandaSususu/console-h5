import qs from 'qs'

import axios from '@/utils/request'

/**
 * 获取帖子列表
 * @param {*} options 获取帖子列表参数
 */
const getList = async (options) => axios.get('/public/list?' + qs.stringify(options))

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
  getAds
}
