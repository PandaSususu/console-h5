import {
  extend,
  localize
} from 'vee-validate'
import {
  required,
  email,
  min,
  max,
  length,
  confirmed
} from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('required', required)
extend('min', min)
extend('max', max)
extend('length', length)
extend('confirmed', confirmed)

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    name: '用户名',
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    code: '验证码'
  },
  fields: {
    email: {
      email: '请输入正确的{_field_}'
    },
    confirmPassword: {
      confirmed: '确认密码不匹配'
    }
  }
})
