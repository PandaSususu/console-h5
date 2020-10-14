<template>
  <div class="layui-container">
    <ul class="layui-nav layui-bg-white" lay-filter="">
      <li class="layui-nav-item"><router-link :to="{ name: 'login' }">登录</router-link></li>
      <li class="layui-nav-item layui-this"><router-link :to="{ name: 'reg' }">注册</router-link></li>
    </ul>
    <validation-observer ref="observer" v-slot="{ validate }">
      <form class="layui-form layui-form-pane" action>
        <div class="layui-form-item">
          <label class="layui-form-label">邮箱</label>
          <validation-provider rules="required|email" name="email" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="text" name="email" placeholder="请输入邮箱" autocomplete="off" class="layui-input" v-model.trim="email" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <validation-provider rules="required|max:8|min:4" name="name" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="text" name="name" placeholder="请输入用户名" autocomplete="off" class="layui-input" v-model.trim="name" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <validation-provider rules="required|max:16|min:6" vid="confirmation" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="password" name="password" v-model="password" placeholder="请输入密码" autocomplete="off" class="layui-input" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">确认密码</label>
          <validation-provider rules="required|confirmed:confirmation" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="password" name="confirmPassword" v-model="confirmPassword" placeholder="请输入密码" autocomplete="off" class="layui-input" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item captcha">
          <label class="layui-form-label">验证码</label>
          <validation-provider rules="required|length:4" name="code" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="text" name="code" placeholder="请输入验证码"  v-model="code" autocomplete="off" class="layui-input" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
            <div class="layui-form-mid layui-word-aux svg" v-html="codeInfo.svg" @click="_getCode()"></div>
          </validation-provider>
        </div>

        <div class="submit">
          <button class="layui-btn" type="button" @click="validate().then(submit)">立即注册</button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { getCode, reg } from '@/api/login'
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
      name: '',
      password: '',
      confirmPassword: '',
      code: ''
    }
  },
  methods: {
    _getCode() {
      getCode(this.$store.state.sid).then(res => {
        if (res.code === 200) {
          this.codeInfo = res.data
        }
      })
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      reg({
        email: this.email,
        name: this.name,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 10000) {
          this.$pop('注册成功')
          this.$router.push('/login')
        } else if (res.code === 9001) {
          this.$refs.observer.setErrors(res.message)
        }
      })
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
