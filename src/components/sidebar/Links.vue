<template>
  <div class="ui-panel">
    <h3 class="title">友情链接</h3>
    <ul>
      <li><a href="">百度</a></li>
      <li><a href="">百度</a></li>
      <li><a href="">百度</a></li>
      <li><a href="">百度</a></li>
      <li><a href="">申请友谊</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'links'
}
</script>

<style lang="scss" scoped>
ul {
  overflow: hidden;
  line-height: 40px;
  li {
    float: left;
    margin-right: 15px;
  }
  li:last-child a {
    color: #11C2EE;
  }
}
</style>
