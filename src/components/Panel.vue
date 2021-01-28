<template>
  <div class="panel">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link v-for="(item, index) in navList" :key="'nav' + index" tag="li" :to="item.path">
          <a href="#">{{ item.name }}</a>
        </router-link>
        <li class="layui-hide-xs"><span class="line"></span></li>
        <template v-if="isLogin">
          <li class="layui-hide-xs"><router-link :to="{ name: 'posts' }">我发表的帖</router-link></li>
          <li class="layui-hide-xs"><router-link :to="{ name: 'collection' }">我收藏的帖</router-link></li>
        </template>
      </ul>
      <div class="post layui-hide-xs">
        <ui-search @handleFocus="handleFocus" @handleBlur="handleBlur" @handleSearch="handleSearch" :width="searchWidth"></ui-search>
        <router-link class="layui-btn" tag="button" :to="{ name: 'add' }">发表新帖</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/contents/Search'

export default {
  name: 'panel',
  components: {
    'ui-search': Search
  },
  data() {
    return {
      navList: [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '提问',
          path: '/index/ask'
        },
        {
          name: '分享',
          path: '/index/share'
        },
        {
          name: '讨论',
          path: '/index/discuss'
        },
        {
          name: '建议',
          path: '/index/advise'
        },
        {
          name: '公告',
          path: '/index/notice'
        },
        {
          name: '动态',
          path: '/index/logs'
        }
      ],
      isLogin: this.$store.state.isLogin,
      searchWidth: '250px'
    }
  },
  methods: {
    handleFocus() {
      this.searchWidth = '400px'
    },
    handleBlur() {
      this.searchWidth = '250px'
    },
    handleSearch(value) {
      if (!value) {
        return this.$pop('请输入关键字', 'shake')
      }
      this.$router.push({ name: 'result', params: { keyword: value } })
    }
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .panel {
    height: auto !important;

    ul {
      li {
        width: 33.33%;
        padding: 0 !important;
      }
    }
  }
}

.panel {
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  position: relative;
  margin-bottom: 10px;

  ul {
    li {
      display: inline-block;
      padding: 0 20px;

      .line {
        display: inline-block;
        height: 15px;
        width: 2px;
        background-color: #e2e2e2;
        vertical-align: middle;
      }
      a:hover {
        color: #009688;
      }
    }
  }

  .post {
    position: absolute;
    right: 15px;
    top: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }
}

.layui-this a {
  color: #009688;
}
</style>
