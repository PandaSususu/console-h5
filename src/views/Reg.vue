<template>
  <div class="layui-container">
    <ul class="layui-nav layui-bg-white" lay-filter="">
      <li class="layui-nav-item"><router-link :to="{ name: 'login' }">登录</router-link></li>
      <li class="layui-nav-item layui-this"><router-link :to="{ name: 'reg' }">注册</router-link></li>
    </ul>
    <form class="layui-form layui-form-pane" action>
      <div class="layui-form-item">
        <label class="layui-form-label">邮箱</label>
        <div class="layui-input-inline">
          <input type="text" name="email" placeholder="请输入邮箱" autocomplete="off" class="layui-input" v-model.trim="email" v-validate="'required|email'" />
        </div>
        <div class="layui-form-mid layui-word-aux">{{ errors.first('email') }}</div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">用户名</label>
        <div class="layui-input-inline">
          <input type="text" name="name" placeholder="请输入用户名" autocomplete="off" class="layui-input" v-model.trim="name" v-validate="'required|max:8|min:4'" />
        </div>
        <div class="layui-form-mid layui-word-aux">{{ errors.first('name') }}</div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">密码</label>
        <div class="layui-input-inline">
          <input type="password" name="password" v-model="password" v-validate="'required|max:16|min:6'" placeholder="请输入密码" autocomplete="off" class="layui-input" />
        </div>
        <div class="layui-form-mid layui-word-aux">{{ errors.first('password') }}</div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">确认密码</label>
        <div class="layui-input-inline">
          <input type="password" name="confirmPassword" v-model="confirmPassword" v-validate="'required|max:16'" placeholder="请输入密码" autocomplete="off" class="layui-input" />
        </div>
        <div class="layui-form-mid layui-word-aux">{{ errors.first('confirmPassword') }}</div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">验证码</label>
        <div class="layui-input-inline">
          <input type="text" name="code" v-validate="'required|length:4'" placeholder="请输入验证码" autocomplete="off" class="layui-input" />
        </div>
        <div class="layui-form-mid layui-word-aux svg" v-html="codeInfo.svg" @click="_getCode()"></div>
        <div class="layui-form-mid layui-word-aux">{{ errors.first('code') }}</div>
      </div>

      <button type="button" class="layui-btn">立即注册</button>
    </form>
  </div>
</template>

<script>
import { getCode } from '@/api/getCode'
export default {
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
      getCode().then(res => {
        if (res.code === 200) {
          this.codeInfo = res.data
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
