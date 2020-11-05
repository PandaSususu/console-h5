<<<<<<< HEAD
<template>
  <div v-show="isShow">
    <div class="explain" :class="{ 'active': isShow }">
      <div class="title">
        <p>签到说明</p>
        <i class="layui-icon layui-icon-close" @click="hide()"></i>
      </div>
      <div class="conter">
        <div class="tips">“签到”可获得社区飞吻，规则如下</div>
        <div class="tab">
          <table class="layui-table">
            <colgroup>
              <col width="200" />
              <col width="200" />
              <col />
            </colgroup>
            <thead class="text-center">
              <tr>
                <th>连续签到的天数</th>
                <th>每天可获积分</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">＜5</td>
                <td class="text-center">5</td>
              </tr>
               <tr>
                <td class="text-center">≥5</td>
                <td class="text-center">10</td>
              </tr>
               <tr>
                <td class="text-center">≥15</td>
                <td class="text-center">15</td>
              </tr>
               <tr>
                <td class="text-center">≥30</td>
                <td class="text-center">20</td>
              </tr>
              <tr>
                <td class="text-center">≥100</td>
                <td class="text-center">30</td>
              </tr>
               <tr>
                <td class="text-center">≥365</td>
                <td class="text-center">50</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="warn">
          <p><span class="layui-badge-dot layui-bg-black"></span>中间若有间隔，则连续天数重新计算</p>
          <p><span class="layui-badge-dot"></span>不可利用程序自动签到，否则积分清零</p>
        </div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'signExplain',
  props: {
    isShow: {
      type: Boolean,
      default: false
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
.conter {
  padding: 0 20px;
}
.layui-table th {
  text-align: center;
}
.tips {
      line-height: 40px;
      background-color: #f2f2f2;
      margin: 20px 0 10px;
      padding: 10px 0 10px 10px;
      border-left: 6px solid #009688;
    }
    .tab {
      max-height: 400px;
      overflow-y: auto;
    }

    .warn {
      margin-top: 10px;
      p {
        display: flex;
        align-items: center;

        span {
          margin-right: 6px;
        }
      }
      p:last-child {
        color: #FF5722;
        margin-top: 6px;
      }
    }
</style>
=======
<template>
  <div v-show="isShow">
    <div class="explain" :class="{ 'active': isShow }">
      <div class="title">
        <p>签到说明</p>
        <i class="layui-icon layui-icon-close" @click="hide()"></i>
      </div>
      <div class="conter">
        <div class="tips">“签到”可获得社区飞吻，规则如下</div>
        <div class="tab">
          <table class="layui-table">
            <colgroup>
              <col width="200" />
              <col width="200" />
              <col />
            </colgroup>
            <thead class="text-center">
              <tr>
                <th>连续签到的天数</th>
                <th>每天可获积分</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">＜5</td>
                <td class="text-center">5</td>
              </tr>
               <tr>
                <td class="text-center">≥5</td>
                <td class="text-center">10</td>
              </tr>
               <tr>
                <td class="text-center">≥15</td>
                <td class="text-center">15</td>
              </tr>
               <tr>
                <td class="text-center">≥30</td>
                <td class="text-center">20</td>
              </tr>
              <tr>
                <td class="text-center">≥100</td>
                <td class="text-center">30</td>
              </tr>
               <tr>
                <td class="text-center">≥365</td>
                <td class="text-center">50</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="warn">
          <p><span class="layui-badge-dot layui-bg-black"></span>中间若有间隔，则连续天数重新计算</p>
          <p><span class="layui-badge-dot"></span>不可利用程序自动签到，否则积分清零</p>
        </div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'signExplain',
  props: {
    isShow: {
      type: Boolean,
      default: false
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
.conter {
  padding: 0 20px;
}
.layui-table th {
  text-align: center;
}
.tips {
      line-height: 40px;
      background-color: #f2f2f2;
      margin: 20px 0 10px;
      padding: 10px 0 10px 10px;
      border-left: 6px solid #009688;
    }
    .tab {
      max-height: 400px;
      overflow-y: auto;
    }

    .warn {
      margin-top: 10px;
      p {
        display: flex;
        align-items: center;

        span {
          margin-right: 6px;
        }
      }
      p:last-child {
        color: #FF5722;
        margin-top: 6px;
      }
    }
</style>
>>>>>>> b56d1452d7e161faf3dfbdda0c36f40c4fb4ed59
