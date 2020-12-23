<template>
  <transition name="face">
    <div class="upload-image ui-pancl" v-show="isShow">
      <div class="title">插入图片</div>
      <div class="content">
        <form class="layui-form layui-form-pane upload">
          <div>
            <div class="layui-form-item image-link">
              <label class="layui-form-label">链接</label>
              <div class="layui-input-block">
                <input type="text" name="link" v-model="imageUrl" placeholder="请输入图片链接" autocomplete="off" class="layui-input" />
              </div>
            </div>
            <label for="uploadImage">
              <i class="layui-icon layui-btn layui-btn-primary">&#xe67c;本地图片</i>
              <input type="file" name="uploadImage" id="uploadImage" class="file-input" accept="image/png, image/jpg, image/gif" @change="upload" />
            </label>
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
import { uploadImage } from '@/api/content'
import config from '@/config'

export default {
  name: 'uploadImage',
  props: ['isShow'],
  data() {
    return {
      formData: '',
      imageUrl: ''
    }
  },
  methods: {
    upload(e) {
      const files = e.target.files
      if (files.length > 0) {
        const formData = new FormData()
        formData.append('file', files[0])
        this.formData = formData
      }
      uploadImage(this.formData).then((res) => {
        if (res.code === 10000) {
          this.imageUrl = config.baseUrl + res.data.path
        }
      })
    },
    cancel() {
      this.$emit('closeEvent')
    },
    submit() {
      if (!this.imageUrl) {
        this.$pop('请输入图片链接', 'shake')
        return false
      }
      this.$emit('addEvent', this.imageUrl)
      this.imageUrl = ''
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.upload-image {
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
          margin-right: 10px;
          width: 400px;
        }
      }
      .file-input {
        display: none;
      }
    }
  }
}
</style>
