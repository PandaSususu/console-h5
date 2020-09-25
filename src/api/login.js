import axios from '@/utils/request'

/**
 * 修改密码发送邮箱验证接口
 * @param {*} emailInfo 邮箱信息
 */
const sendEmail = async (emailInfo) => {
  return axios.post('/login/sendemail', emailInfo)
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

export { sendEmail, getCode, login }
