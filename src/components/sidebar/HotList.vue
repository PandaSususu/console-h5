<template>
  <div class="ui-panel">
    <h3 class="title">本周热议</h3>
    <ul>
      <li>
        <p>layui的Github</p>
        <p><span class="layui-icon layui-icon-dialogue"></span>16</p>
      </li>
      <li>
        <p>layui的Github</p>
        <p><span class="layui-icon layui-icon-dialogue"></span>16</p>
      </li>
      <li>
        <p>layui的Github</p>
        <p><span class="layui-icon layui-icon-dialogue"></span>16</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hotList'
}
</script>

<style lang="scss" scoped>
ul {
  padding: 10px 0;
  line-height: 34px;
  li {
    overflow: hidden;
    p {
      float: left;
    }
    p:first-child {
      color: #333;
      font-size: 16px;
      margin-right: 4px;
    }
    p:last-child {
      color: #999;
      font-size: 14px;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
