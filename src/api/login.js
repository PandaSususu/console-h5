import axios from '@/utils/request'

const sendEmail = async (emailInfo) => {
  return axios.post('/sendemail', emailInfo)
}

const getCode = async (sid) => {
  return axios.get('/getcode', {
    params: {
      sid: sid
    }
  })
}

export { sendEmail, getCode }
