import { escapeHtml } from '@/utils/escapeHtml'

export default {
  casehtml: {
    bind: function(el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}
