<template>
  <ul class="layui-nav">
    <li class="layui-nav-item logo">
      <img src="../assets/images/logo.png" alt="" />
    </li>
    <li class="layui-nav-item"><router-link to="/">首页</router-link></li>
    <!-- <li class="layui-nav-item"><a href="">产品</a></li>
    <li class="layui-nav-item"><a href="">大数据</a></li>
    <li class="layui-nav-item">
      <a href="javascript:;">解决方案</a>
      <dl class="layui-nav-child">
        <dd><a href="">移动模块</a></dd>
        <dd><a href="">后台模版</a></dd>
        <dd><a href="">电商平台</a></dd>
      </dl>
    </li> -->
    <li class="layui-nav-item">
      <a @click.prevent="$pop('功能开发中')">发现</a>
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
          <dd><router-link :to="{ name: 'setting' }">修改信息</router-link></dd>
          <dd><a href="javascript:;" @click="switchAccount()">切换账号</a></dd>
          <dd><a href="javascript:;" @click="quitAccount()">退出登录</a></dd>
        </dl>
      </li>
      <li class="layui-nav-item float-right">
        <router-link :to="{ name: 'center' }">个人中心<span class="layui-badge-dot"></span></router-link>
      </li>
      <li class="layui-nav-item float-right messages">
        <router-link :to="{ name: 'message' }"
          >消息中心<span class="layui-badge" v-show="count">{{ count }}</span></router-link
        >
        <transition name="face">
          <router-link tag="div" class="message-tips" v-show="hasMsg" :to="{ name: 'message' }">
            <span v-if="!type">您有{{ count }}条未读消息</span>
            <span v-else-if="type === 'comment'">收到一条新的评论</span>
            <span v-else-if="type === 'collect'">有人收藏你的帖子啦</span>
            <span v-else-if="type === 'hands'">有人点赞了你的评论</span>
            <i class="arrow-top"></i>
          </router-link>
        </transition>
      </li>
    </template>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TopHeader',
  data() {
    return {
      hasMsg: false
    }
  },
  watch: {
    count(newValue, oldValue) {
      const route = this.$route.name
      if (newValue !== oldValue && newValue !== 0 && route !== 'message') {
        this.hasMsg = true
        setTimeout(() => {
          this.hasMsg = false
        }, 3000)
      }
    }
  },
  computed: {
    ...mapState({
      count: state => state.msgNum.total,
      type: state => state.msgNum.type,
      isPop: state => state.event
    }),
    isShow() {
      return this.$store.state.isLogin
    },
    userInfo() {
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
      this.$pop('退出成功')
      this.$store.commit('setLoginStatus', false)
      this.$store.commit('setUserInfo', null)
      this.$store.commit('setUserToken', '')
      this.$store.commit('closeWebSocket')
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    },
    switchAccount() {
      this.$router.push({ name: 'login' })
    },
    quitAccount() {
      this.$confirm('你确定要退出当前登录吗？', () => {
        this.loginOut()
        this.$router.push({ name: 'index' }, () => {})
      })
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.float-right {
  float: right;
}

.logo {
  margin-right: 20px;
  img {
    width: 60px;
  }
}

.messages {
  margin-right: 10px;
  position: relative;
}

.message-tips {
  position: absolute;
  bottom: -44px;
  left: 0;
  width: 160px;
  height: 40px;
  background-color: #000;
  text-align: center;
  line-height: 40px;
  z-index: 999;
  border-radius: 10px;

  .arrow-top {
    display: inline-block;
    position: absolute;
    top: -30px;
    left: 20px;
    width: 0px;
    height: 0px;
    border-top: 15px solid rgba(0, 0, 0, 0);
    border-bottom: 15px solid #000;
    border-left: 14px solid rgba(0, 0, 0, 0);
    border-right: 5px solid rgba(0, 0, 0, 0);
    background-color: none;
  }
}
</style>
