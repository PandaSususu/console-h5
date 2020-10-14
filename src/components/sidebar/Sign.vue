<template>
  <div class="ui-panel">
    <div class="nav">
      <ul>
        <li>签到</li>
        <li><span class="line"></span></li>
        <li @click="isShowExplain = true"
            class="selected">说明</li>
        <li><span class="line"></span></li>
        <li @click="isShowList = true"
            class="selected">活跃榜</li>
      </ul>
      <p>已连续签到<span>{{ count }}</span>天</p>
    </div>
    <div class="sign">
      <template v-if="!isSign">
        <button class="layui-btn layui-btn-danger"
              @click="_sign()">今日签到</button>
        <p>可获得<span>{{ avaFavs }}</span>积分</p>
      </template>
      <template v-if="isSign">
        <button class="layui-btn layui-btn-disabled"
              @click="_sign()">今日已签到</button>
        <p>已获得<span>{{ obtFavs }}</span>积分</p>
      </template>
    </div>
    <ui-signExplain :isShow="isShowExplain"
                    @closeModal="close()"></ui-signExplain>
    <ui-signList :isShow="isShowList"
                 @closeModal="close()"></ui-signList>
  </div>
</template>

<script>
import { sign } from '@/api/sign'

import SignExplain from './common/SignExplain'
import SignList from './common/SignList'

export default {
  name: 'sign',
  components: {
    'ui-signExplain': SignExplain,
    'ui-signList': SignList
  },
  computed: {
    count () {
      if (this.$store.state.isLogin) {
        return this.$store.state.userInfo.count
      } else {
        return 0
      }
    },
    avaFavs () {
      if (this.$store.state.isLogin) {
        const count = this.$store.state.userInfo.count
        return this.computeFavs(count + 1)
      } else {
        return 5
      }
    },
    obtFavs() {
      const count = this.$store.state.userInfo.count
      return this.computeFavs(count)
    },
    isSign() {
      if (this.$store.state.userInfo !== {}) {
        return this.$store.state.userInfo.isSign
      }
      return false
    }
  },
  data () {
    return {
      isShowExplain: false,
      isShowList: false
    }
  },
  methods: {
    close () {
      this.isShowExplain = false
      this.isShowList = false
    },
    _sign () {
      if (this.isSign) {
        this.$pop('您今天已签到过啦', 'shake')
        return
      }
      if (this.$store.state.isLogin) {
        sign().then((res) => {
          if (res.code === 10000) {
            this.$store.state.userInfo.count = res.data.count
            this.$store.state.userInfo.favs = res.data.favs
            this.$store.state.userInfo.isSign = true
            localStorage.setItem('userInfo', JSON.stringify(this.$store.state.userInfo))
            this.$pop('签到成功')
          } else {
            this.$pop(res.message)
          }
        }).catch((error) => {
          this.$alert(error)
        })
      } else {
        this.$pop('请先登录哦', 'shake')
      }
    },
    computeFavs(count) {
      let favs
      if (count < 5) {
        favs = 5
      } else if (count >= 5 && count < 15) {
        favs = 10
      } else if (count >= 15 && count < 30) {
        favs = 15
      } else if (count >= 30 && count < 100) {
        favs = 20
      } else if (count >= 100 && count < 365) {
        favs = 30
      } else {
        favs = 50
      }
      return favs
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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 3000;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;

  &.active {
    animation: show 0.3s ease;
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
