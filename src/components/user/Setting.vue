<template>
  <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
    <ul class="layui-tab-title">
      <li class="layui-nav-item"><router-link :to="{ name: 'setting' }">我的资料</router-link></li>
      <li class="layui-nav-item"><router-link :to="{ name: 'picupload' }">上传头像</router-link></li>
      <li class="layui-nav-item"><router-link :to="{ name: 'password' }">修改密码</router-link></li>
      <li class="layui-nav-item"><router-link :to="{ name: 'accounts' }">账号绑定</router-link></li>
    </ul>
    <div class="layui-tab-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-setting',
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.layui-tab {
  margin: 0;
  display: flex;
  flex-direction: column;

  .layui-tab-content {
    flex: 1;
    background-color: #fff;
  }
}
</style>
