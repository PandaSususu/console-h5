<template>
  <validation-observer ref="observer" v-slot="{ validate }">
    <form class="layui-form layui-form-pane">
      <div class="layui-form-item">
        <label class="layui-form-label">邮箱</label>
        <validation-provider rules="required|email" v-slot="{ errors }">
          <div class="layui-input-inline">
            <input type="text" name="email" placeholder="请输入邮箱" autocomplete="off" class="layui-input" v-model.trim="email" />
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
      <div class="layui-form-item">
        <label class="layui-form-label">城市</label>
        <validation-provider rules="required|max:8|min:4" v-slot="{ errors }">
          <div class="layui-input-inline">
            <input type="text" name="name" v-model="name" placeholder="请输入用户名" autocomplete="off" class="layui-input" />
          </div>
          <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
        </validation-provider>
      </div>

      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">个性签名</label>
        <div class="layui-input-block">
          <textarea name="desc" placeholder="说一下你的心情吧" class="layui-textarea"></textarea>
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

export default {
  name: 'myinfo',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: '',
      name: ''
    }
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      console.log('submit')
    }
  },
  mounted() {}
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

.verification:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
