<template>
  <transition name="face">
    <div class="preview ui-pancl" v-show="isShow">
      <div class="title">
        <p>预览</p>
        <span @click="cancel()"><i class="layui-icon layui-icon-close"></i></span>
      </div>
      <div class="content">
        <div class="escape-html" v-html="replaceContent"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { escapeHtml } from '@/utils/escapeHtml'

export default {
  name: 'preview',
  props: ['isShow', 'content'],
  computed: {
    replaceContent() {
      if (!this.content) return
      return escapeHtml(this.content)
    }
  },
  data() {
    return {}
  },
  methods: {
    cancel() {
      this.$emit('closeEvent')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 5px 5px 5px #ddd;
  z-index: 99;
  background-color: #fff;

  .title {
    background-color: #f2f2f2;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
  }

  .content {
    padding: 20px;
  }
}
</style>
