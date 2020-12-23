<template>
  <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
    <ul class="layui-tab-title">
      <li><router-link :to="{ name: 'posts' }">我的发帖</router-link></li>
      <li><router-link :to="{ name: 'collection' }">我的收藏</router-link></li>
    </ul>
    <div class="layui-tab-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-posts',
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
