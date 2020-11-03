<template>
  <div class="upload-box">
    <button type="button" class="layui-btn" id="test1"><i class="layui-icon">&#xe67c;</i>上传图片</button>
    <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过60KB</p>
    <img src="//t.cn/RCzsdCq" alt="" />
  </div>
</template>

<script>
export default {
  name: 'pic-upload',
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.upload-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  button {
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 20px;
  }

  img {
    border-radius: 50%;
  }
}
</style>
