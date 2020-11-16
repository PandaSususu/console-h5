import { ValidationProvider, ValidationObserver } from 'vee-validate'
import uuid from 'uuid/v4'

import { getCode } from '@/api/login'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      codeInfo: {},
      code: ''
    }
  },
  methods: {
    _getCode() {
      getCode(this.$store.state.sid).then(res => {
        if (res.code === 10000) {
          this.codeInfo = res.data
        }
      })
    }
  },
  mounted() {
    const sid = localStorage.getItem('sid') ? localStorage.getItem('sid') : uuid()
    localStorage.setItem('sid', sid)
    this.$store.commit('setSid', sid)
    this._getCode()
  }
}
