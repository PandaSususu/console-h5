<template>
  <ul class="layui-nav" lay-filter="">
    <li class="layui-nav-item"><router-link to="/">首页</router-link></li>
    <li class="layui-nav-item"><a href="">产品</a></li>
    <li class="layui-nav-item"><a href="">大数据</a></li>
    <li class="layui-nav-item">
      <a href="javascript:;">解决方案</a>
      <dl class="layui-nav-child">
        <!-- 二级菜单 -->
        <dd><a href="">移动模块</a></dd>
        <dd><a href="">后台模版</a></dd>
        <dd><a href="">电商平台</a></dd>
      </dl>
    </li>
    <li class="layui-nav-item">
      <a href="">控制台<span class="layui-badge">9</span></a>
    </li>
    <template v-if="!isShow">
      <li class="layui-nav-item float-right">
        <router-link :to="{ name: 'reg' }">注册</router-link>
      </li>
      <li class="layui-nav-item float-right">
        <router-link :to="{ name: 'login' }">登录</router-link>
      </li>
    </template>
    <template v-else>
      <li class="layui-nav-item float-right">
        <a href="javascript:;"><img :src="userInfo.pic" class="layui-nav-img" />{{ userInfo.name }}</a>
        <dl class="layui-nav-child">
          <dd><a href="javascript:;">修改信息</a></dd>
          <dd><a href="javascript:;">安全管理</a></dd>
          <dd><a href="javascript:;" @click="loginOut()">注销</a></dd>
        </dl>
      </li>
      <li class="layui-nav-item float-right">
        <router-link :to="{ name: 'center' }">个人中心<span class="layui-badge-dot"></span></router-link>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {}
  },
  computed: {
    isShow() {
      return this.$store.state.isLogin
    },
    userInfo() {
      console.log(this.$store.state.userInfo)
      return (
        this.$store.state.userInfo || {
          name: '',
          email: '',
          pic: ''
        }
      )
    }
  },
  methods: {
    loginOut() {
      this.$store.commit('setLoginStatus', false)
      this.$router.push('/login')
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.float-right {
  float: right;
}
</style>
