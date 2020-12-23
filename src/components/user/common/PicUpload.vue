<template>
  <div class="upload-box">
    <label for="pic">
      <i class="layui-icon layui-btn">&#xe67c;上传图片</i>
      <input type="file" name="pic" id="pic" accept="image/png, image/jpg, image/gif" @change="upload">
    </label>
    <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过60KB</p>
    <img :src="pic" alt="" />
  </div>
</template>

<script>
import { uploadImage } from '@/api/content'
import { updateInfo } from '@/api/user'

import config from '@/config'

export default {
  name: 'pic-upload',
  data() {
    return {
      pic: this.$store.state.userInfo.pic,
      formData: ''
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
          this.pic = config.baseUrl + res.data.path
          updateInfo({ pic: this.pic }).then((res) => {
            if (res.code === 10000) {
              this.$store.state.userInfo.pic = res.data.pic
              localStorage.setItem('userInfo', JSON.stringify(this.$store.state.userInfo))
              this.$pop('头像更新成功')
            } else {
              this.$alert(res.message)
            }
          })
        } else {
          this.$alert(res.message)
        }
      })
    }
  },
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
  width: 70%;
  margin: 0 auto;
  padding: 20px;
  input {
    display: none;
  }
  p {
    margin-bottom: 20px;
  }

  img {
    border-radius: 50%;
    width: 168px;
    height: 168px;
  }
}
</style>
