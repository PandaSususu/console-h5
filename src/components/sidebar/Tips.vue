<template>
  <div class="ui-panel">
    <h3 class="title">温馨通道</h3>
    <ul>
      <li class="layui-col-xs6"><a href="">layui的Githublayui的Githublayui的Github</a></li>
      <li class="layui-col-xs6"><a href="">layui的Github</a></li>
      <li class="layui-col-xs6"><a href="">layui的Github</a></li>
      <li class="layui-col-xs6"><a href="">layui的Github</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tips'
}
</script>

<style lang="scss" scoped>
  ul {
    border: 1px solid #f2f2f2;
    overflow: hidden;
    margin: 10px 0;
    border-right: none;
    border-bottom: none;
    li {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-right: 1px solid #f2f2f2;
      border-bottom: 1px solid #f2f2f2;
      padding: 0 6px;

      a {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        &:hover {
          color: #009688;
        }
      }
    }
  }
</style>
