<template>
  <div class="layui-container ui-panel" style="flex: 1">
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li class="layui-this">发表新帖</li>
      </ul>
      <div class="layui-tab-content">
        <validation-observer ref="observer" v-slot="{ validate }">
          <form class="layui-form layui-form-pane">
            <div class="layui-row layui-col-space20">
              <div class="layui-col-md3">
                <label class="layui-form-label">所在专栏</label>
                <validation-provider rules="is_not:请选择" name="catalog" v-slot="{ errors }">
                  <div
                    class="layui-input-block"
                    @click="
                      isSelect = !isSelect
                      isSelect_fav = false
                    "
                  >
                    <div class="layui-unselect layui-form-select" :class="{ 'layui-form-selected': isSelect }">
                      <div class="layui-select-title">
                        <input type="text" placeholder="请选择" readonly class="layui-input layui-unselect" v-model="catalogs[catalogIndex].text" />
                        <i class="layui-edge"></i>
                      </div>
                      <dl class="layui-anim layui-anim-upbit">
                        <dd v-for="(item, index) in catalogs" :key="'catalog' + index" :class="{ 'layui-this': catalogIndex === index }" @click="choice(item, index)">
                          {{ item.text }}
                        </dd>
                      </dl>
                    </div>
                    <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                  </div>
                </validation-provider>
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
              <div
                class="layui-input-inline"
                @click="
                  isSelect_fav = !isSelect_fav
                  isSelect = false
                "
              >
                <div class="layui-unselect layui-form-select" :class="{ 'layui-form-selected': isSelect_fav }">
                  <div class="layui-select-title">
                    <input type="text" placeholder="请选择" readonly class="layui-input layui-unselect" v-model="favs[favIndex]" />
                    <i class="layui-edge"></i>
                  </div>
                  <dl class="layui-anim layui-anim-upbit">
                    <dd v-for="(item, index) in favs" :key="'fav' + index" :class="{ 'layui-this': favIndex === index }" @click="choiceFav(item, index)">
                      {{ item }}
                    </dd>
                  </dl>
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
              <button class="layui-btn" type="button" @click="validate().then(submit)">立即发布</button>
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
import { addPost } from '@/api/post'

export default {
  name: 'add',
  components: {
    'ui-editor': Editor
  },
  mixins: [code],
  data() {
    return {
      isSelect: false,
      isSelect_fav: false,
      catalogIndex: 0,
      favIndex: 0,
      title: '',
      content: '',
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
    choice(catalog, index) {
      this.catalogIndex = index
    },
    choiceFav(fav, index) {
      this.favIndex = index
    },
    getContent(val) {
      this.content = val
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      if (!this.content.trim()) {
        this.$alert('内容不能为空')
        return false
      }
      addPost({
        title: this.title,
        catalog: this.catalogs[this.catalogIndex].value,
        content: this.content,
        fav: this.favs[this.favIndex],
        code: this.code,
        sid: this.sid
      }).then(res => {
        if (res.code === 10000) {
          this.$pop('恭喜你，发帖成功')
          localStorage.removeItem('addData')
          setTimeout(() => {
            this.content = ''
            this.title = ''
            this.$router.push({ name: 'detail', params: { tid: res.data } })
          }, 3000)
        } else if (res.code === 9000) {
          this.$refs.codefield.setErrors([res.message])
        } else {
          this.$alert(res.message)
        }
      })
    },
    leavePage() {
      if (this.title.trim() || this.content.trim()) {
        const addData = {
          title: this.title,
          content: this.content,
          catalogIndex: this.catalogIndex,
          favIndex: this.favIndex
        }
        localStorage.setItem('addData', JSON.stringify(addData))
      }
    }
  },
  mounted() {
    window.addEventListener('beforeunload', this.leavePage)
    let addData = localStorage.getItem('addData')
    if (addData) {
      this.$confirm(
        '是否加载未编辑完的内容？',
        () => {
          addData = JSON.parse(addData)
          this.title = addData.title
          this.content = addData.content
          this.catalogIndex = addData.catalogIndex
          this.favIndex = addData.favIndex
        },
        () => {
          localStorage.removeItem('addData')
        }
      )
    }
  },
  beforeDestroy() {
    this.leavePage()
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.leavePage)
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
