import axios from 'axios'

const getCode = async () => {
  let result
  try {
    result = await axios.get('/getcode')
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {
    console.log(error)
  }
  return result
}

export { getCode }
