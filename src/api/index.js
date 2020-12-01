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

export {
  getTopWeek,
  getTips,
  getLinks,
  getAds
}
