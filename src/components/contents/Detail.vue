<template>
  <div>
    <ui-panel></ui-panel>
    <div class="layui-container">
      <div class="layui-row layui-col-space10">
        <div class="layui-col-md8">
          <div class="ui-panel post">
            <div class="post-title">
              <h3>{{ postInfo.title }}</h3>
              <div class="labels">
                <div class="tags">
                  <div>
                    <span class="layui-badge layui-bg-green">{{ catalogObj[postInfo.catalog] }}</span>
                    <span class="layui-badge layui-bg-gray">{{ postInfo.isEnd === '0' ? '未结' : '已结' }}</span>
                    <span class="layui-badge layui-bg-blue" v-if="postInfo.isTop === '1'">置顶</span>
                    <span class="layui-badge" v-for="(tag, index) in postInfo.tags" :key="'tag' + index" :class="tag.class">{{ tag.name }}</span>
                  </div>
                  <div v-show="false">
                    <span class="layui-badge layui-bg-blue">删除</span>
                    <span class="layui-badge layui-bg-black">置顶</span>
                    <span class="layui-badge layui-bg-gray">加精</span>
                  </div>
                </div>
                <div class="count">
                  <p><i class="layui-icon layui-icon-dialogue"></i>{{ postInfo.answer }}</p>
                  <p><i class="layui-icon layui-icon-rate-solid"></i>{{ postInfo.reads}}</p>
                </div>
              </div>
            </div>
            <div class="post-user">
              <div class="info">
                <div class="pic">
                  <img :src="postInfo.user ? postInfo.user.pic : ''" alt="" />
                </div>
                <div class="basic">
                  <p class="user">
                    <span class="name">{{ postInfo.user ? postInfo.user.name : '' }}</span>
                    <span class="vip"
                      v-if="postInfo.user && postInfo.user.isVip === '1'"><svg t="1601396379570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365" width="200" height="200">
                        <path
                          d="M605.693 867.837h-63.715v-304.621h63.715v304.621M881.428 719.652c-16.991 25.486-43.449 38.108-79.493 38.108h-73.060v110.077h-63.715v-304.621h139.325c29.491 0 52.671 8.738 69.42 26.093 16.869 17.355 25.244 41.142 25.244 71.483 0.122 21.36-5.825 41.021-17.718 58.861M186.383 867.837v-648.685c0-2.67-2.185-4.854-4.854-4.854h-49.637c-2.67 0-4.854-2.185-4.854-4.854v-49.759c0-2.67 2.185-4.854 4.854-4.854h227.92c2.67 0 4.854 2.185 4.854 4.854v292.242l297.703-295.641c0.85-0.85 2.185-1.456 3.398-1.456h221.972c4.369 0 6.432 5.219 3.398 8.253l-704.754 704.754M822.446 625.596c-8.738-6.432-23.059-9.709-42.962-9.709h-50.608v89.202h59.104c20.389 0 34.224-6.19 41.628-18.569 4.005-6.796 5.947-16.384 5.947-28.763 0-14.928-4.369-25.607-13.107-32.161M822.446 625.596z"
                          fill="#EEC211"
                          p-id="1366"
                        ></path></svg
                    ></span>
                    <span class="layui-badge layui-bg-blue" v-if="postInfo.user && postInfo.user.isVip === '1'">VIP3</span>
                    <span class="date">{{ postInfo.created }}</span>
                  </p>
                  <p class="fav">悬赏：{{ postInfo.fav }}积分</p>
                </div>
              </div>
              <div class="operation">
                <button class="layui-btn">编辑</button>
                <button class="layui-btn layui-btn-primary">收藏</button>
              </div>
            </div>
            <div class="post-content" v-html="postInfo.content"></div>
          </div>
          <div class="post-comment ui-panel">
            <h3>评论</h3>
            <div class="comments">
              <div class="comment-item">
                <div class="post-user">
                  <div class="info">
                    <div class="pic">
                      <img src="http://localhost:36742/images/20201116/fb7a39a1-4264-40aa-b826-bb9f996daae1.jpg" alt="" />
                    </div>
                    <div class="basic">
                      <p class="user">
                        <span class="name">闲心</span>
                        <span class="vip"
                          ><svg t="1601396379570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365" width="200" height="200">
                            <path
                              d="M605.693 867.837h-63.715v-304.621h63.715v304.621M881.428 719.652c-16.991 25.486-43.449 38.108-79.493 38.108h-73.060v110.077h-63.715v-304.621h139.325c29.491 0 52.671 8.738 69.42 26.093 16.869 17.355 25.244 41.142 25.244 71.483 0.122 21.36-5.825 41.021-17.718 58.861M186.383 867.837v-648.685c0-2.67-2.185-4.854-4.854-4.854h-49.637c-2.67 0-4.854-2.185-4.854-4.854v-49.759c0-2.67 2.185-4.854 4.854-4.854h227.92c2.67 0 4.854 2.185 4.854 4.854v292.242l297.703-295.641c0.85-0.85 2.185-1.456 3.398-1.456h221.972c4.369 0 6.432 5.219 3.398 8.253l-704.754 704.754M822.446 625.596c-8.738-6.432-23.059-9.709-42.962-9.709h-50.608v89.202h59.104c20.389 0 34.224-6.19 41.628-18.569 4.005-6.796 5.947-16.384 5.947-28.763 0-14.928-4.369-25.607-13.107-32.161M822.446 625.596z"
                              fill="#EEC211"
                              p-id="1366"
                            ></path></svg
                        ></span>
                        <span class="layui-badge layui-bg-blue">VIP3</span>
                      </p>
                      <p class="date">2020-11-30</p>
                    </div>
                  </div>
                </div>
                <div class="comment-comtent">
                  haahahahh
                </div>
                <div class="operation">
                  <div>
                    <span><i class="layui-icon layui-icon-praise"></i>66</span>
                    <span><i class="layui-icon layui-icon-reply-fill"></i>回复</span>
                  </div>
                  <div>
                    <a href="">编辑</a>
                    <a href="">删除</a>
                    <a href="">采纳</a>
                  </div>
                </div>
              </div>
              <div class="comment-item">
                <div class="post-user">
                  <div class="info">
                    <div class="pic">
                      <img src="http://localhost:36742/images/20201116/fb7a39a1-4264-40aa-b826-bb9f996daae1.jpg" alt="" />
                    </div>
                    <div class="basic">
                      <p class="user">
                        <span class="name">闲心</span>
                        <span class="vip"
                          ><svg t="1601396379570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365" width="200" height="200">
                            <path
                              d="M605.693 867.837h-63.715v-304.621h63.715v304.621M881.428 719.652c-16.991 25.486-43.449 38.108-79.493 38.108h-73.060v110.077h-63.715v-304.621h139.325c29.491 0 52.671 8.738 69.42 26.093 16.869 17.355 25.244 41.142 25.244 71.483 0.122 21.36-5.825 41.021-17.718 58.861M186.383 867.837v-648.685c0-2.67-2.185-4.854-4.854-4.854h-49.637c-2.67 0-4.854-2.185-4.854-4.854v-49.759c0-2.67 2.185-4.854 4.854-4.854h227.92c2.67 0 4.854 2.185 4.854 4.854v292.242l297.703-295.641c0.85-0.85 2.185-1.456 3.398-1.456h221.972c4.369 0 6.432 5.219 3.398 8.253l-704.754 704.754M822.446 625.596c-8.738-6.432-23.059-9.709-42.962-9.709h-50.608v89.202h59.104c20.389 0 34.224-6.19 41.628-18.569 4.005-6.796 5.947-16.384 5.947-28.763 0-14.928-4.369-25.607-13.107-32.161M822.446 625.596z"
                              fill="#EEC211"
                              p-id="1366"
                            ></path></svg
                        ></span>
                        <span class="layui-badge layui-bg-blue">VIP3</span>
                      </p>
                      <p class="date">2020-11-30</p>
                    </div>
                  </div>
                </div>
                <div class="comment-comtent">
                  haahahahh
                </div>
                <div class="operation">
                  <div>
                    <span><i class="layui-icon layui-icon-praise"></i>66</span>
                    <span><i class="layui-icon layui-icon-reply-fill"></i>回复</span>
                  </div>
                  <div>
                    <a href="">编辑</a>
                    <a href="">删除</a>
                    <a href="">采纳</a>
                  </div>
                </div>
              </div>
              <div class="comment-item">
                <div class="post-user">
                  <div class="info">
                    <div class="pic">
                      <img src="http://localhost:36742/images/20201116/fb7a39a1-4264-40aa-b826-bb9f996daae1.jpg" alt="" />
                    </div>
                    <div class="basic">
                      <p class="user">
                        <span class="name">闲心</span>
                        <span class="vip"
                          ><svg t="1601396379570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365" width="200" height="200">
                            <path
                              d="M605.693 867.837h-63.715v-304.621h63.715v304.621M881.428 719.652c-16.991 25.486-43.449 38.108-79.493 38.108h-73.060v110.077h-63.715v-304.621h139.325c29.491 0 52.671 8.738 69.42 26.093 16.869 17.355 25.244 41.142 25.244 71.483 0.122 21.36-5.825 41.021-17.718 58.861M186.383 867.837v-648.685c0-2.67-2.185-4.854-4.854-4.854h-49.637c-2.67 0-4.854-2.185-4.854-4.854v-49.759c0-2.67 2.185-4.854 4.854-4.854h227.92c2.67 0 4.854 2.185 4.854 4.854v292.242l297.703-295.641c0.85-0.85 2.185-1.456 3.398-1.456h221.972c4.369 0 6.432 5.219 3.398 8.253l-704.754 704.754M822.446 625.596c-8.738-6.432-23.059-9.709-42.962-9.709h-50.608v89.202h59.104c20.389 0 34.224-6.19 41.628-18.569 4.005-6.796 5.947-16.384 5.947-28.763 0-14.928-4.369-25.607-13.107-32.161M822.446 625.596z"
                              fill="#EEC211"
                              p-id="1366"
                            ></path></svg
                        ></span>
                        <span class="layui-badge layui-bg-blue">VIP3</span>
                      </p>
                      <p class="date">2020-11-30</p>
                    </div>
                  </div>
                </div>
                <div class="comment-comtent">
                  haahahahh
                </div>
                <div class="operation">
                  <div>
                    <span><i class="layui-icon layui-icon-praise"></i>66</span>
                    <span><i class="layui-icon layui-icon-reply-fill"></i>回复</span>
                  </div>
                  <div>
                    <a href="">编辑</a>
                    <a href="">删除</a>
                    <a href="">采纳</a>
                  </div>
                </div>
              </div>
            </div>
            <ui-page :total="total" :size="size" :current="current" @changePage="handleChange"></ui-page>
          </div>
          <validation-observer ref="observer" v-slot="{ validate }">
            <form class="layui-form layui-form-pane" action="">
              <ui-editor @changeContent="getContent"></ui-editor>
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
                <button class="layui-btn" type="button" @click="validate().then(submit)">发表评论</button>
              </div>
            </form>
          </validation-observer>
        </div>
        <div class="layui-col-md4">
          <ui-tips></ui-tips>
          <ui-sign></ui-sign>
          <ui-hotlist></ui-hotlist>
          <ui-ads></ui-ads>
          <ui-links></ui-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Editor from '@/components/modules/editor/Index'
import code from '@/mixin/code'
import Page from '@/components/modules/paging/Paging'
import { getDetail, getComments } from '@/api/index'
import { postComments } from '@/api/user'
import { escapeHtml } from '@/utils/escapeHtml'

export default {
  name: 'index',
  components: {
    'ui-panel': Panel,
    'ui-tips': Tips,
    'ui-sign': Sign,
    'ui-hotlist': HotList,
    'ui-ads': Ads,
    'ui-links': Links,
    'ui-editor': Editor,
    'ui-page': Page
  },
  mixins: [code],
  data() {
    return {
      content: '',
      code: '',
      total: 101,
      size: 15,
      current: 5,
      postInfo: {},
      catalogObj: {
        index: '全部',
        ask: '提问',
        advise: '建议',
        discuss: '交流',
        share: '分享',
        news: '动态'
      }
    }
  },
  methods: {
    getContent(val) {
      this.content = val
    },
    async submit() {
      if (!this.$store.state.isLogin) {
        this.$pop('先登录才能发表评论哦', 'shake')
        return
      }
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      if (!this.content.trim()) {
        this.$alert('评论内容不能为空')
        return false
      }
      postComments({
        tid: this.postInfo._id,
        uid: this.$store.state.userInfo._id,
        content: this.content,
        sid: this.sid,
        code: this.code
      }).then((res) => {
        if (res.code === 10000) {
          this.$pop(res.message)
          this.code = ''
          this.content = ''
          this._getCode()
        } else if (res.code === 9000) {
          this.$refs.codefield.setErrors([res.message])
        }
      })
    },
    handleChange(pageNumber) {
      this.current = pageNumber
    }
  },
  mounted() {
    const tid = this.$route.params.tid
    getDetail({ tid }).then((res) => {
      if (res.code === 10000) {
        this.postInfo = res.data
        this.postInfo.content = escapeHtml(this.postInfo.content)
        getComments({ tid }).then((res) => {
          console.log(res)
        })
      } else {
        this.$alert(res.message)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.post {
  padding: 20px 15px;
}
.post-title {
  padding-bottom: 10px;
  h3 {
    font-size: 20px;
  }

  .labels {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    > div {
      display: flex;
    }
    .tags {
      color: #fff;
      span {
        margin-right: 6px;
        font-size: 12px;
      }
      span:last-child {
        margin-right: 0px;
      }
      > div:first-child {
        margin-right: 20px;
      }
    }
    .count {
      p:first-child {
        margin-right: 10px;
      }
    }
  }
}

.post-user {
  background-color: #f2f2f2;
  padding: 15px 10px;
  .info {
    display: flex;
    align-items: center;
    .pic {
      width: 60px;
      height: 60px;
      margin-right: 10px;
      overflow: hidden;
      border-radius: 4px;
      img {
        width: 100%;
      }
    }
    .basic {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 60px;
      .user {
        .name {
          color: #1abde6;
        }
        .vip {
          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
      .fav {
        color: #ee6911;
      }
      .date {
        color: #999;
        margin-left: 10px;
      }
    }
  }
  .operation {
    display: flex;
    justify-content: flex-end;
  }
}

.post-content {
  padding: 20px 0;
}

.post-comment {
  margin-top: 10px;
  h3 {
    text-align: center;
    padding: 10px 0;
  }

  .comments {
    .comment-item {
      border-bottom: 1px solid #f2f2f2;
      padding: 10px 0;
    }
    .post-user {
      background-color: #fff;
      padding: 0;
      margin-bottom: 10px;
    }
    .comment-comtent {
      padding: 20px 0;
    }
    .operation {
      display: flex;
      justify-content: space-between;
      color: #999;
      > div:first-child {
        span:first-child {
          margin-right: 10px;
        }
      }
      > div:last-child {
        a {
          margin-right: 10px;
          color: #999;
        }
        a:last-child {
          margin-right: 0;
        }
      }
    }
  }
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
.submit {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  margin-bottom: 20px;
}
</style>
