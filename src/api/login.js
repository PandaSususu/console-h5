import axios from '@/utils/request'

/**
 * 修改密码发送邮箱验证接口
 * @param {*} emailInfo 邮箱信息
 */
const forget = async (emailInfo) => {
  return axios.post('/login/forget', emailInfo)
}

/**
 * 获取图片验证码
 * @param {*} sid 图片验证码唯一标识
 */
const getCode = async (sid) => {
  return axios.get('/public/getcode', {
    params: {
      sid: sid
    }
  })
}

/**
 * 用户登录接口
 * @param {*} loginInfo 用户登录信息
 */
const login = async (loginInfo) => {
  return axios.post('/login/login', loginInfo)
}

/**
 * 用户注册接口
 * @param {*} loginInfo 用户注册信息
 */
const reg = async (regInfo) => {
  return axios.post('/login/reg', regInfo)
}

export { forget, getCode, login, reg }
