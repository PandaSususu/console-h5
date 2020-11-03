<template>
  <div class="layui-container">
    <ul class="layui-nav layui-bg-white" lay-filter>
      <li class="layui-nav-item layui-this">
        <router-link :to="{ name: 'login' }">登录</router-link>
      </li>
      <li class="layui-nav-item">
        <router-link :to="{ name: 'reg' }">注册</router-link>
      </li>
    </ul>
    <validation-observer ref="observer" v-slot="{ validate }">
      <form class="layui-form layui-form-pane">
        <div class="layui-form-item">
          <label class="layui-form-label">邮箱</label>
          <validation-provider rules="required|email" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="text" name="email" placeholder="请输入邮箱" autocomplete="off" class="layui-input" v-model.trim="email" />
            </div>
            <div class="layui-form-mid layui-word-aux">
              <span>{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <validation-provider rules="required|max:16|min:6" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="password" name="password" v-model="password" placeholder="请输入密码" autocomplete="off" class="layui-input" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item captcha">
          <label class="layui-form-label">验证码</label>
          <validation-provider ref="codefield" rules="required|length:4" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="text" name="code" v-model="code" placeholder="请输入验证码" autocomplete="off" class="layui-input" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
            <div class="layui-form-mid layui-word-aux svg" v-html="codeInfo.svg" @click="_getCode()"></div>
          </validation-provider>
        </div>

        <div class="submit">
          <button class="layui-btn" type="button" @click="validate().then(submit)">立即登录</button>
          <router-link :to="{ name: 'forget' }" class="btn-hover">忘记密码</router-link>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode, login } from '@/api/login'
import uuid from 'uuid/v4'

export default {
  data() {
    return {
      codeInfo: {},
      email: '',
      password: '',
      code: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
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
      login({
        email: this.email,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 10000) {
          this.$pop('登录成功')
          this.$store.commit('setUserInfo', res.data)
          this.$store.commit('setLoginStatus', true)
          this.$router.push({ name: 'index' })
        } else if (res.code === 9003) {
          this.$refs.codefield.setErrors([res.message])
        } else {
          this.$alert(res.message)
        }
      })
    }
  },
  mounted() {
    window.vue = this
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
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
