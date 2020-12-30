import store from '@/store'

class WebSocketClient {
  constructor(config = {}) {
    const defaultConfig = {
      url: '127.0.0.1',
      port: '4001',
      protocol: 'ws',
      timeInterval: 5 * 1000
    }

    const finalConfig = { ...defaultConfig, ...config }
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.wsc = {}
    this.interval = null
    this.timeInterval = finalConfig.timeInterval
  }

  // 初始化websocket
  initWs() {
    this.wsc = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)

    this.wsc.onopen = () => this.onOpen()
    this.wsc.onmessage = msg => this.onMessage(msg.data)
    this.wsc.onclose = () => this.onClose()
    this.wsc.onerror = () => this.onError()
  }

  // 连接成功
  onOpen() {
    console.log('连接成功')
    this.sendMsg({
      event: 'auth',
      message: 'Bearer ' + store.state.token
    })
  }

  // 接收服务端消息
  onMessage(msg) {
    const msgObj = JSON.parse(msg)
    switch (msgObj.event) {
      case 'auth':
        break
      case 'noauth':
        break
      case 'heartbeat':
        this.checkHeartbeat()
        break
      default:
        store.dispatch('msgTotal', msgObj.message)
    }
  }

  // 主动断开连接
  onClose() {
    console.log('断开连接')
    this.wsc.close()
  }

  // 错误断开连接
  onError() {
    setTimeout(() => {
      this.initWs()
    }, this.timeInterval)
  }

  // 发送消息
  sendMsg(msg) {
    this.wsc.send(JSON.stringify(msg))
  }

  // 心跳检测
  checkHeartbeat() {
    clearTimeout(this.interval)
    this.sendMsg({
      event: 'heartbeat',
      message: 'pong'
    })
    this.interval = setTimeout(() => {
      this.onClose()
      this.initWs()
    }, this.timeInterval + 500)
  }
}

export default WebSocketClient
