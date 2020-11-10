<template>
  <div class="layui-container">
    <ul class="layui-nav layui-bg-white" lay-filter="">
      <li class="layui-nav-item"><router-link :to="{ name: 'login' }">登录</router-link></li>
      <li class="layui-nav-item layui-this">重置密码</li>
    </ul>
    <validation-observer ref="observer" v-slot="{ validate }">
      <form class="layui-form layui-form-pane" action>
        <div class="layui-form-item">
          <label class="layui-form-label">新密码</label>
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
              <input type="password" name="confirmPassword" v-model="confirmPassword" placeholder="请输入确认密码" autocomplete="off" class="layui-input" />
            </div>
            <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import { reset } from '@/api/login'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      key: ''
    }
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      reset({
        password: this.password,
        key: this.key
      }).then((res) => {
        if (res.code === 10000) {
          this.$pop(res.message)
          setTimeout(() => {
            this.$router.push({ name: 'login' })
          }, 3000)
        } else {
          this.$alert(res.message)
        }
      })
    }
  },
  mounted() {
    const queryStr = window.location.href.replace(/.*\?/, '')
    const queryObj = Object.fromEntries(queryStr.split('&').map(parms => parms.split('=')))
    this.key = queryObj.key
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
