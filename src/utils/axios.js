import axios from 'axios'

import errorHandle from './errorHandle'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  // 设定拦截器
  interceptors(instance) {
    instance.interceptors.request.use((config) => {
      return config
    }, (error) => {
      errorHandle(error)
      return Promise.reject(error)
    })

    instance.interceptors.response.use((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (error) => {
      errorHandle(error)
      return Promise.reject(error)
    })
  }

  // 创建实例
  request(option) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), option)
    this.interceptors(instance)
    return instance(newOptions)
  }

  // get请求
  get(url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }

  // post请求
  post(url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
