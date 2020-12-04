import PopComponent from './Pop.vue'

const Pop = {}

Pop.install = (Vue) => {
  const PopConstructor = Vue.extend(PopComponent)
  const instance = new PopConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$pop = (msg, type = 'zoom', time = 3000) => {
    instance.type = type
    instance.msg = msg
    instance.isShow = true
    instance.time = time
  }
}

export default Pop
