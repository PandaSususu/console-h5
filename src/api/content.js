import axios from '@/utils/request'

/**
 * 图片上传
 * @param {*}
 */
const uploadImage = async (formData) => axios.post('/content/upload', formData)

export {
  uploadImage
}
