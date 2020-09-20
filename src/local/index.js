import { Validator } from 'vee-validate'

const dictionary = {
  'zh-CN': {
    messages: {
      required: filed => '请输入' + filed,
      email: () => '请输入正确的邮箱格式',
      length: () => '图片验证码长度为4位',
      max: (filed, length) => filed + `最大长度为${length}位`,
      min: (filed, length) => filed + `最小长度为${length}位`
    },
    attributes: {
      name: '用户名',
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      code: '验证码'
    }
  }
}

Validator.localize(dictionary)
