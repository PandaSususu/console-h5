import axios from 'axios'

import errorHandle from './errorHandle'
import store from '../store'
import baseUrlConfig from '../config'

const CancelToken = axios.CancelToken

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.pending = {}
  }

  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 80000
    }
    return config
  }

  // 取消重复请求
  removePending(key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('你正在重复请求')
    }
    delete this.pending[key]
  }

  // 设定请求拦截器
  interceptors(instance) {
    instance.interceptors.request.use((config) => {
      console.log('请求~~~>' + config.url + '到~~~>' + config.baseUrl)
      const token = store.state.token
      let isPublic = false
      baseUrlConfig.publicBaseUrl.map((path) => {
        isPublic = isPublic || path.test(config.url)
      })
      if (!isPublic && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      const key = config.url + '&' + config.method
      this.removePending(key, true)
      config.cancelToken = new CancelToken((c) => {
        this.pending[key] = c
      })
      return config
    }, (error) => {
      errorHandle(error)
      return Promise.reject(error)
    })

    // 设定响应拦截器
    instance.interceptors.response.use((res) => {
      const key = res.config.url + '&' + res.config.method
      this.removePending(key)
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
