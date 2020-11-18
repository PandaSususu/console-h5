import axios from '@/utils/request'

/**
 * 图片上传
 * @param {*}
 */
const uploadImage = async (formData) => axios.post('/content/upload', formData)

/**
 * 发表新帖
 * @param {*}
 */
const addPost = async (option) => {
  axios.post('/content/add', option)
}
export {
  uploadImage,
  addPost
}
