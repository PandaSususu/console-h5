<template>
  <validation-observer ref="observer" v-slot="{ validate }">
    <form class="layui-form layui-form-pane">
      <div class="layui-form-item">
        <label class="layui-form-label">邮箱</label>
        <validation-provider rules="required|email" v-slot="{ errors }">
          <div class="layui-input-inline">
            <input type="text" name="email" v-model="email" placeholder="请输入邮箱" autocomplete="off" class="layui-input" v-model.trim="email" />
          </div>
          <div class="layui-form-mid layui-word-aux">
            <span v-if="errors[0]">{{ errors[0] }}</span>
            <p v-else class="tips">如果您在邮箱已激活的情况下，变更了邮箱，需<span class="verification">重新验证邮箱</span></p>
          </div>
        </validation-provider>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">用户名</label>
        <validation-provider rules="required|max:8|min:4" v-slot="{ errors }">
          <div class="layui-input-inline">
            <input type="text" name="name" v-model="name" placeholder="请输入用户名" autocomplete="off" class="layui-input" />
          </div>
          <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
        </validation-provider>
      </div>
      <div class="layui-form-item gender">
        <label class="layui-form-label">性别</label>
        <div class="layui-input-inline">
          <label for="gender0" class="fly-margin-right">
          <input type="radio" id="gender0" name="sex" value="0" v-model="gender" title="男">
          <i class="layui-icon layui-icon-circle" :class="{ 'layui-icon-radio': gender === '0' }"></i>
          男
        </label>
        <label for="gender1">
          <input type="radio" id="gender1" name="sex" value="1" v-model="gender" title="女">
          <i class="layui-icon layui-icon-circle" :class="{ 'layui-icon-radio': gender === '1' }"></i>
          女
        </label>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">城市</label>
        <validation-provider v-slot="{ errors }">
          <div class="layui-input-inline">
            <input type="text" name="location" v-model="location" placeholder="请输入用户名" autocomplete="off" class="layui-input" />
          </div>
          <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
        </validation-provider>
      </div>

      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">个性签名</label>
        <div class="layui-input-block">
          <textarea name="regmark" placeholder="说一下你的心情吧" v-model="regmark" class="layui-textarea"></textarea>
        </div>
      </div>

      <div class="submit">
        <button class="layui-btn" type="button" @click="validate().then(submit)">确认修改</button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import { updateInfo } from '@/api/user'

export default {
  name: 'myinfo',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: this.$store.state.userInfo.email,
      name: this.$store.state.userInfo.name,
      location: this.$store.state.userInfo.location,
      gender: this.$store.state.userInfo.gender,
      regmark: this.$store.state.userInfo.regmark
    }
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      const option = {
        email: this.email,
        name: this.name,
        location: this.location,
        gender: this.gender,
        regmark: this.regmark
      }
      updateInfo(option).then((res) => {
        if (res.code === 10000) {
          for (const key in res.data) {
            this.$store.state.userInfo[key] = res.data[key]
          }
          localStorage.setItem('userInfo', JSON.stringify(this.$store.state.userInfo))
          this.$pop('修改成功')
        } else {
          this.$alert(res.message)
        }
      }).catch((error) => {
        this.$pop(error, 'shake')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ui-panel {
  padding: 20px 10px;
}

.tips {
  color: #999;
  .verification {
    color: #2b91d5;
  }
}

.gender {
  display: flex;
  align-items: center;

  > label {
    margin-right: 10px;
  }

  .layui-icon-radio {
    color: #009688;
  }
}
</style>
