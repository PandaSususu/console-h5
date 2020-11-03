<template>
  <div class="ui-panel">
    <div class="community">
      <i class="layui-icon layui-icon-login-qq"></i>
      <p>已成功绑定，当然，您也可以<span>解除绑定</span></p>
    </div>
    <div class="community">
      <i class="layui-icon layui-icon-login-weibo"></i>
      <p>已成功绑定，当然，您也可以<span>解除绑定</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accounts',
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.ui-panel {
  background-color: #f2f2f2;
}
.community {
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 10px;
  background-color: #fff;
  padding: 0 10px;

  i {
    font-size: 24px;
    margin-right: 10px;
  }

  p {
    font-size: 14px;

    span {
      color: #2B91D5;
    }
  }
}
</style>
