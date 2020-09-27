<template>
  <div class="layui-container">
    <ul class="layui-nav layui-bg-white" lay-filter="">
      <li class="layui-nav-item"><router-link :to="{ name: 'login' }">登录</router-link></li>
      <li class="layui-nav-item layui-this"><router-link :to="{ name: 'forget' }">找回密码</router-link></li>
    </ul>
    <validation-observer ref="observer" v-slot="{ validate }">
      <form class="layui-form layui-form-pane" action>
        <div class="layui-form-item">
          <label class="layui-form-label">邮箱</label>
          <validation-provider rules="required|email" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="text" name="email" placeholder="请输入邮箱" autocomplete="off" class="layui-input" v-model.trim="email" v-validate="'required|email'" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors.first[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <validation-provider rules="required|length:4" v-slot="{ errors }">
            <div class="layui-input-inline">
            <input type="text" name="code" v-validate="'required|length:4'" placeholder="请输入验证码" v-model.trim="code" autocomplete="off" class="layui-input" />
          </div>
          <div class="layui-form-mid layui-word-aux svg" v-html="codeInfo.svg" @click="_getCode()"></div>
          <div class="layui-form-mid layui-word-aux">{{ errors.first[0] }}</div>
          </validation-provider>
        </div>
        <button type="button" class="layui-btn"  @click="validate().then(submit)">提交</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { getCode, sendEmail } from '@/api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      codeInfo: {},
      email: '',
      code: ''
    }
  },
  methods: {
    _getCode() {
      getCode().then(res => {
        if (res.code === 200) {
          this.codeInfo = res.data
        }
      })
    },
    submit() {
      if (this.code.toLowerCase() === this.codeInfo.text.toLowerCase()) {
        sendEmail({ email: this.email }).then(res => {
          if (res.code === 200) {
            alert('邮箱发送成功')
          }
        })
      }
    }
  },
  mounted() {
    this._getCode()
  }
}
</script>
<style lang="scss" scoped>
.layui-container {
  background-color: #fff;
}

.layui-bg-white {
  background-color: #fff;
  color: #333;
  margin-bottom: 10px;
}

.layui-nav .layui-nav-item a {
  color: #333;
}

.layui-input-block,
.layui-input-inline {
  input {
    width: 250px;
  }
}

.layui-form-item .layui-input-inline {
  width: 250px;
}

.svg {
  position: relative;
  top: -15px;
}

.btn-hover {
  margin-left: 20px;
  &:hover {
    color: #009688;
  }
}

.layui-word-aux {
  color: red !important ;
}
</style>
