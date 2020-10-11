<template>
  <div class="ui-panel">
    <div class="nav">
      <ul>
        <li>签到</li>
        <li><span class="line"></span></li>
        <li @click="explain()">说明</li>
        <li><span class="line"></span></li>
        <li>活跃榜<span class="layui-badge-dot"></span></li>
      </ul>
      <p>已连续签到<span>16</span>天</p>
    </div>
    <div class="sign">
      <button class="layui-btn layui-btn-danger">今日签到</button>
      <p>可获得<span>5</span>飞吻</p>
    </div>

    <view>
      <div ref="test">
        <h1>哈哈哈哈哈</h1>
      </div>
    </view>
  </div>
</template>

<script>
export default {
  name: 'sign',
  methods: {
    explain() {}
  }
}
</script>

<style lang="scss" scoped>
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
</style>
