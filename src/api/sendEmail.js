import axios from 'axios'

const sendEmail = async (emailInfo) => {
  let result
  try {
    result = await axios.post('/sendemail', emailInfo)
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {
    console.log(error)
  }
  return result
}

export { sendEmail }
