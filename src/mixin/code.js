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
      code: '',
      sid: ''
    }
  },
  methods: {
    _getCode() {
      getCode(this.sid).then(res => {
        if (res.code === 10000) {
          this.codeInfo = res.data
        }
      })
    }
  },
  mounted() {
    this.sid = localStorage.getItem('sid') ? localStorage.getItem('sid') : uuid()
    localStorage.setItem('sid', this.sid)
    this.$store.commit('setSid', this.sid)
    this._getCode()
  }
}
