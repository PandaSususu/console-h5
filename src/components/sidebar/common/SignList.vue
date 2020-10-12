<template>
  <div v-show="isShow">
    <div class="explain" :class="{ active: isShow }">
      <div class="title">
        <p>签到活跃榜 - Top 20</p>
        <i class="layui-icon layui-icon-close" @click="hide()"></i>
      </div>
      <div class="conter">
        <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
          <ul class="layui-tab-title">
            <li class="layui-this" @click="index = 1">最新签到</li>
            <li @click="index = 2">今日最快</li>
            <li @click="index = 3">总签到榜</li>
          </ul>
          <div class="layui-tab-content">
            <ul v-if="index == 1" class="signList">
              <li>
                <img src="//t.cn/RCzsdCq" alt="" />
                <p><span>张三</span>签到于2020-10-12 00:00:00</p>
              </li>
            </ul>
            <ul v-else-if="index == 2" class="signList">
               <li>
                <img src="//t.cn/RCzsdCq" alt="" />
                <p><span>张三</span>签到于00:00:00</p>
              </li>
               <li>
                <img src="//t.cn/RCzsdCq" alt="" />
                <p><span>张三</span>签到于00:00:00</p>
              </li>
            </ul>
            <ul v-else class="signList">
               <li>
                <img src="//t.cn/RCzsdCq" alt="" />
                <p><span>张三</span> 已连续签到<span>天</span></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'signList',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: 1
    }
  },
  mounted() {},
  methods: {
    hide() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-tab-title {
  display: flex;

  li {
    flex: 1;
  }
}

.layui-tab-content {
  max-height: 480px;
  overflow-y: auto;

  .signList {
    li {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f2f2f2;
      img {
        width: 40px;
        margin-right: 10px;
      }

      p {
        color: #999;

        span {
          color: #E66B1A;
        }
      }
    }
  }
}
</style>
