<template>
  <div class="ui-panel">
    <div class="nav">
      <ul>
        <li>签到</li>
        <li><span class="line"></span></li>
        <li @click="isShowExplain = true" class="selected">说明</li>
        <li><span class="line"></span></li>
        <li @click="isShowList = true" class="selected">活跃榜</li>
      </ul>
      <p>已连续签到<span>16</span>天</p>
    </div>
    <div class="sign">
      <button class="layui-btn layui-btn-danger" @click="sign()">今日签到</button>
      <p>可获得<span>5</span>积分</p>
    </div>
    <ui-signExplain :isShow="isShowExplain" @closeModal="close()"></ui-signExplain>
    <ui-signList :isShow="isShowList" @closeModal="close()"></ui-signList>
  </div>
</template>

<script>
import SignExplain from './common/SignExplain'
import SignList from './common/SignList'

export default {
  name: 'sign',
  components: {
    'ui-signExplain': SignExplain,
    'ui-signList': SignList
  },
  data() {
    return {
      isShowExplain: false,
      isShowList: true
    }
  },
  methods: {
    close() {
      this.isShowExplain = false
      this.isShowList = false
    },
    sign() {
      if (this.$store.state.isLogin) {
        console.log('一登陆')
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="scss">
.nav {
  border-bottom: 1px solid #f2f2f2;
  overflow: hidden;
  ul {
    overflow: hidden;
    line-height: 40px;
    float: left;
    li {
      float: left;
      cursor: pointer;

      .line {
        display: inline-block;
        width: 2px;
        height: 10px;
        background-color: #ddd;
        margin: 0 20px 0 10px;
        vertical-align: middle;
      }

      .layui-badge-dot {
        margin: 0 0 6px 2px;
      }
    }
  }

  p {
    float: right;
    line-height: 40px;
    font-size: 12px;
    color: #999;
    span {
      color: #e6941a;
    }
  }
}

.sign {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  p {
    margin-left: 10px;
    span {
      color: #e6941a;
    }
  }
}

.explain {
  max-width: 400px;
  max-height: 600px;
  position: fixed;
  top:0;right:0;bottom:0;left:0;margin:auto;
  z-index: 3000;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;

  &.active {
    animation: show .3s ease;
  }

  .title {
    background-color: #f2f2f2;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px 10px 0 0;
  }
}
</style>
