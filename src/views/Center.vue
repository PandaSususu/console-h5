<template>
  <div class="layui-container fly-margin-top center">
    <ul class="layui-nav layui-nav-tree siderbar">
      <li class="layui-nav-item layui-nav-itemed" v-for="(item, index) in navList" :key="'nav' + index">
        <a href><i class="layui-icon fly-margin-right" :class="item.icon"></i>{{ item.name }}</a>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          name: '我的主页',
          icon: 'layui-icon-home'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set'
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-list'
        },
        {
          name: '我的消息',
          icon: 'layui-icon-dialogue'
        },
        {
          name: '其他设置',
          icon: 'layui-icon-more'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  flex: 1;
  display: flex;

  .siderbar {
    height: 100%;
  }
}
</style>
