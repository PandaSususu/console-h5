import AlertComponent from './Alert'

const Alert = {}

Alert.install = (Vue) => {
  const AlertConstructor = Vue.extend(AlertComponent)
  const instance = new AlertConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$alert = (msg) => {
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }
  Vue.prototype.$confirm = (msg, confirm, cancel) => {
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    if (confirm) {
      instance.confirm = confirm
    }
    if (cancel) {
      instance.cancel = cancel
    }
  }
}

export default Alert
