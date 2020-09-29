<template>
  <div class="panel">
    <div class="layui-container">
      <ul class="layui-clear">
        <li class="layui-hide-xs"><a href="">首页</a></li>
        <li><a href="">提问</a></li>
        <li><a href="">分享</a></li>
        <li><a href="">讨论</a></li>
        <li><a href="">建议</a></li>
        <li><a href="">公告</a></li>
        <li><a href="">动态</a></li>
        <li class="layui-hide-xs"><span class="line"></span></li>
        <li class="layui-hide-xs"><a href="">我发表的帖</a></li>
        <li class="layui-hide-xs"><a href="">我收藏的帖</a></li>
      </ul>
      <div class="post layui-hide-xs">
        <span class="layui-icon layui-icon-search"></span>
        <button class="layui-btn">发表新帖</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel'
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
    }
  }

  .post {
    position: absolute;
    right: 15px;
    top: 0;
    display: flex;
    align-items: center;

    span {
      margin-right: 10px;
      font-size: 24px;
      cursor: pointer;

      &:hover {
        color: #22DD92;
      }
    }
  }
}
</style>
