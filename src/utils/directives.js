import { escapeHtml } from '@/utils/escapeHtml'
import store from '@/store'

export default {
  casehtml: {
    bind: function(el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function(el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  },
  hasRule: {
    inserted: function(el, binding) {
      if (store.state.userInfo) {
        const rules = store.state.userInfo.access || ['user']
        if (!rules.includes(binding.value)) {
          console.log(el.parentNode)
          el.parentNode.removeChild(el)
        }
      }
    }
  }
}
