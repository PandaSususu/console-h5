import axios from '@/utils/request'

/**
 * 获取获取签到次数
 * @param {*}
 */
const signNumber = async () => {
  return axios.get('/public/list?' + qs.stringify(options))
}

export {
  signNumber
}
