<template>
  <transition name="face">
    <div class="insert-link ui-pancl" v-show="isShow">
      <div class="title">插入外部链接</div>
      <div class="content">
        <form class="layui-form layui-form-pane upload">
          <div>
            <div class="layui-form-item image-link">
              <label class="layui-form-label">链接</label>
              <div class="layui-input-block">
                <input type="text" name="link" v-model="link" placeholder="请输入合法的链接" autocomplete="off" class="layui-input" />
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
  name: 'insertLink',
  props: ['isShow'],
  data() {
    return {
      link: ''
    }
  },
  methods: {
    submit() {
      if (!this.link) {
        this.$pop('请输入合法的链接', 'shake')
        return false
      }
      this.$emit('addEvent', this.link)
      this.link = ''
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
  z-index: 99;
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
