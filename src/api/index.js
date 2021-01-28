import qs from 'qs'

import axios from '@/utils/request'
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

/**
 * 获取搜索下拉框列表
 * @param {*}
 */
const searchDropDownList = async keyword =>
  axios.get('/public/drop-down-list', {
    params: {
      keyword
    }
  })

/**
 * 搜索帖子
 * @param {*}
 */
const searchPost = async options => axios.get('/public/search-post?' + qs.stringify(options))

export { getTopWeek, getTips, getLinks, getAds, searchDropDownList, searchPost }
