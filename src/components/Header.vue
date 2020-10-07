<template>
  <ul class="layui-nav" lay-filter="">
    <li class="layui-nav-item"><router-link to="/">首页</router-link></li>
    <li class="layui-nav-item layui-this"><a href="">产品</a></li>
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
    <li class="layui-nav-item float-right">
      <a href=""><img src="//t.cn/RCzsdCq" class="layui-nav-img" />我</a>
      <dl class="layui-nav-child">
        <dd><a href="javascript:;">修改信息</a></dd>
        <dd><a href="javascript:;">安全管理</a></dd>
        <dd><a href="javascript:;">退了</a></dd>
      </dl>
    </li>
    <li class="layui-nav-item float-right">
      <a href="">个人中心<span class="layui-badge-dot"></span></a>
    </li>
    <li class="layui-nav-item float-right">
      <router-link :to="{'name': 'login'}">登录</router-link>
    </li>
    <li class="layui-nav-item float-right">
      <router-link :to="{'name': 'reg'}">注册</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.float-right {
  float: right;
}
</style>
