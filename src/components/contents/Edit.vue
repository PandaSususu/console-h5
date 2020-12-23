<template>
  <div class="layui-container ui-panel" style="flex: 1">
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li class="layui-this">编辑帖子</li>
      </ul>
      <div class="layui-tab-content">
        <validation-observer ref="observer" v-slot="{ validate }">
          <form class="layui-form layui-form-pane">
            <div class="layui-row layui-col-space20">
              <div class="layui-col-md3">
                <label class="layui-form-label">所在专栏</label>
                <div class="layui-input-block">
                  <div class="layui-unselect layui-form-select">
                    <div class="layui-select-title">
                      <input type="text" placeholder="请选择" readonly class="layui-input layui-unselect layui-btn-disabled" v-model="catalogs[catalogIndex].text" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="layui-col-md9">
                <label class="layui-form-label">帖子标题</label>
                <validation-provider rules="required" name="title" v-slot="{ errors }">
                  <div class="layui-input-block">
                    <input type="text" name="title" v-model="title" required lay-verify="required" placeholder="请输入帖子标题" autocomplete="off" class="layui-input" />
                    <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                  </div>
                </validation-provider>
              </div>
            </div>
            <ui-editor @changeContent="getContent" :initContent="content"></ui-editor>
            <div class="layui-form-item favs">
              <label class="layui-form-label">悬赏积分</label>
              <div class="layui-input-inline">
                <div class="layui-unselect layui-form-select">
                  <div class="layui-select-title">
                    <input type="text" placeholder="请选择" readonly class="layui-input layui-unselect layui-btn-disabled" v-model="favs[favIndex]" />
                  </div>
                </div>
              </div>
              <div class="layui-form-mid layui-word-aux">发表后无法更改积分</div>
            </div>

            <div class="layui-form-item captcha">
              <label class="layui-form-label">验证码</label>
              <validation-provider rules="required|length:4" ref="codefield" name="code" v-slot="{ errors }">
                <div class="layui-input-inline">
                  <input type="text" name="code" v-model="code" placeholder="请输入验证码" autocomplete="off" class="layui-input" />
                </div>
                <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                <div class="layui-form-mid layui-word-aux svg" v-html="codeInfo.svg" @click="_getCode()"></div>
              </validation-provider>
            </div>

            <div class="submit">
              <button class="layui-btn" type="button" @click="validate().then(submit)">确认编辑</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '../modules/editor/Index'
import code from '@/mixin/code'
import { updatePost } from '@/api/post'

export default {
  name: 'edit',
  components: {
    'ui-editor': Editor
  },
  mixins: [code],
  props: ['tid', 'postInfo'],
  data() {
    return {
      title: '',
      content: '',
      catalogIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: '请选择',
          value: '请选择'
        },
        {
          text: '全部',
          value: 'index'
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '建议',
          value: 'advise'
        },
        {
          text: '交流',
          value: 'discuss'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '动态',
          value: 'news'
        }
      ],
      favs: [20, 30, 50, 60, 80],
      codeInfo: {},
      code: ''
    }
  },
  methods: {
    getContent(val) {
      this.content = val
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      if (!this.postInfo.content.trim()) {
        this.$alert('内容不能为空')
        return false
      }
      updatePost({
        tid: this.postInfo._id,
        title: this.title,
        content: this.content,
        code: this.code,
        sid: this.sid
      }).then(res => {
        if (res.code === 10000) {
          this.$pop(res.message)
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: this.postInfo._id } })
          }, 3000)
        } else if (res.code === 9000) {
          this.$refs.codefield.setErrors([res.message])
        } else {
          this.$alert(res.message)
        }
      })
    }
  },
  mounted() {
    this.title = this.postInfo.title
    this.content = this.postInfo.content
    this.favIndex = this.favs.indexOf(parseInt(this.postInfo.fav))
    this.catalogIndex = this.catalogs.findIndex(item => item.value === this.postInfo.catalog)
  }
}
</script>

<style lang="scss" scoped>
.layui-word-aux {
  color: red !important ;
}

.captcha {
  height: 80px;
  .svg {
    position: relative;
    padding: 0 !important;
    height: 60px;
    clear: both;
    margin-left: 110px;
  }
}

.favs {
  .layui-word-aux {
    color: #999 !important ;
  }
}

.submit {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
}
</style>
