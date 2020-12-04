<template>
  <transition name="face">
    <div class="insert-link ui-pancl" v-show="isShow">
      <div class="title">插入引用内容片段</div>
      <div class="content">
        <form class="layui-form layui-form-pane upload">
          <div>
            <div class="layui-form-item layui-form-text image-link">
              <div class="layui-input-block">
                <textarea name="desc" v-model="content" placeholder="请输入引用内容" class="layui-textarea"></textarea>
              </div>
            </div>
          </div>
          <div>
            <button class="layui-btn layui-btn-primary" type="button" @click="cancel()">取消</button>
            <button class="layui-btn" type="button" @click="submit()">确定</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'quote',
  props: ['isShow'],
  data() {
    return {
      content: ''
    }
  },
  methods: {
    submit() {
      if (!this.content.trim()) {
        this.$pop('请输入引用内容', 'shake')
        return false
      }
      this.$emit('addEvent', this.content)
      this.content = ''
    },
    cancel() {
      this.$emit('closeEvent')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.insert-link {
  position: absolute;
  top: 40px;
  left: 0;
  box-shadow: 5px 5px 5px #ddd;
  z-index: 9;
  background-color: #fff;

  .title {
    background-color: #f2f2f2;
    padding-left: 20px;
  }

  .content {
    padding: 20px;

    .upload {
      display: flex;
      flex-direction: column;
      align-items: center;

      > div:first-child {
        display: flex;
        .image-link {
          width: 400px;
        }
      }
    }
  }
}
</style>
