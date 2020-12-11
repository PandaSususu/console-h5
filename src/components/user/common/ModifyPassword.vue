<template>
  <div class="layui-container">
    <validation-observer ref="observer" v-slot="{ validate }">
      <form class="layui-form layui-form-pane" action>
        <div class="layui-form-item">
          <label class="layui-form-label">邮箱</label>
          <validation-provider rules="required|email" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="text" name="email" placeholder="请输入邮箱" autocomplete="off" class="layui-input layui-disabled" v-model.trim="email" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item captcha">
          <label class="layui-form-label">验证码</label>
          <validation-provider rules="required|length:4" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="text" name="code" placeholder="请输入验证码" v-model.trim="code" autocomplete="off" class="layui-input" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
            <div class="layui-form-mid layui-word-aux svg" v-html="codeInfo.svg" @click="_getCode()"></div>
          </validation-provider>
        </div>
        <div class="submit">
          <button type="button" class="layui-btn" @click="validate().then(submit)">提交</button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { forget } from '@/api/login'
import code from '@/mixin/code'

export default {
  data() {
    return {
      email: this.$store.state.userInfo.email,
      code: ''
    }
  },
  mixins: [code],
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      forget({
        email: this.email,
        code: this.code,
        sid: this.sid
      }).then((res) => {
        if (res.message === 9000) {
          this.$pop(res.message, 'shake')
        } else if (res.message === 9003) {
          this.$refs.codefield.setErrors([res.message])
        } else {
          this.$alert(res.message)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.layui-container {
  background-color: #fff;
  overflow: hidden;
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

.captcha {
  height: 80px;
  .svg {
    position: relative;
    padding: 0 !important;
    height: 60px;
    clear: both;
    margin-left: 110px;
  }
}

.btn-hover {
  margin-left: 20px;
  &:hover {
    color: #009688;
  }
}

.submit {
  margin: 40px 0 20px;
}
</style>
