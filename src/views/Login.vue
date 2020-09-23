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
    <form class="layui-form layui-form-pane">
      <div class="layui-form-item">
        <label class="layui-form-label">邮箱</label>
        <div class="layui-input-inline">
          <input type="text" name="email" placeholder="请输入邮箱" autocomplete="off" class="layui-input" v-model.trim="email" v-validate="'required|email'" />
        </div>
        <div class="layui-form-mid layui-word-aux">{{ errors.first('email') }}</div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">密码</label>
        <div class="layui-input-inline">
          <input type="password" name="password" v-model="password" v-validate="'required|max:16|min:6'" placeholder="请输入密码" autocomplete="off" class="layui-input" />
        </div>
        <div class="layui-form-mid layui-word-aux">{{ errors.first('password') }}</div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">验证码</label>
        <div class="layui-input-inline">
          <input type="text" name="code" v-validate="'required|length:4'" placeholder="请输入验证码" autocomplete="off" class="layui-input" />
        </div>
        <div class="layui-form-mid layui-word-aux svg" v-html="codeInfo.svg" @click="_getCode()"></div>
        <div class="layui-form-mid layui-word-aux">{{ errors.first('code') }}</div>
      </div>

      <button class="layui-btn" @click="channer()">立即登录</button>
      <router-link :to="{ name: 'forget' }" class="btn-hover">忘记密码</router-link>
    </form>
  </div>
</template>

<script>
import { getCode } from '@/api/login'
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
  methods: {
    _getCode() {
      getCode(this.$store.state.sid).then(res => {
        if (res.code === 200) {
          this.codeInfo = res.data
        }
      })
    },
    channer() {
      if (this.codeInfo.text !== this.code) {
        alert('验证码不正确')
        return
      }
      console.log('xxx')
    }
  },
  mounted() {
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
