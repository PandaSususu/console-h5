<template>
  <div class="tips">
    <i class="layui-icon layui-icon-404"></i>
    <p>您访问的页面不存在</p>
    <button class="layui-btn" @click="backIndex()">回到首页</button>
  </div>
</template>

<script>
export default {
  name: 'noFount',
  data() {
    return {}
  },
  methods: {
    backIndex() {
      this.$router.push({ name: 'index' })
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.tips {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
i {
  font-size: 200px;
}
p {
  color: #999;
  margin: 10px 0;
}
</style>
