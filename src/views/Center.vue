<template>
  <div class="layui-container fly-margin-top personal-center">
    <ul class="layui-nav layui-nav-tree siderbar">
      <li class="layui-nav-item layui-nav-itemed" v-for="(item, index) in navList" :key="'nav' + index">
        <router-link :to="{ name: item.path }" :active-class="item.activeClass"><i class="layui-icon fly-margin-right" :class="item.icon"></i>{{ item.name }}</router-link>
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
          icon: 'layui-icon-home',
          path: 'user'
        },
        {
          name: '个人中心',
          icon: 'layui-icon-home',
          path: 'center'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set',
          path: 'setting',
          activeClass: 'layui-this'
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-list',
          path: 'posts',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'layui-icon-dialogue',
          path: 'message'
        },
        {
          name: '其他设置',
          icon: 'layui-icon-more',
          path: 'other'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-center {
  flex: 1;
  display: flex;

  & > div {
    flex: 1;
  }

  .siderbar {
    height: 100%;
  }
}
</style>
