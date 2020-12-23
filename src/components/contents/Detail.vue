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
                  <p><i class="layui-icon layui-icon-rate-solid"></i>{{ postInfo.reads }}</p>
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
                    <span class="vip" v-if="postInfo.user && postInfo.user.isVip === '1'"
                      ><svg t="1601396379570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365" width="200" height="200">
                        <path
                          d="M605.693 867.837h-63.715v-304.621h63.715v304.621M881.428 719.652c-16.991 25.486-43.449 38.108-79.493 38.108h-73.060v110.077h-63.715v-304.621h139.325c29.491 0 52.671 8.738 69.42 26.093 16.869 17.355 25.244 41.142 25.244 71.483 0.122 21.36-5.825 41.021-17.718 58.861M186.383 867.837v-648.685c0-2.67-2.185-4.854-4.854-4.854h-49.637c-2.67 0-4.854-2.185-4.854-4.854v-49.759c0-2.67 2.185-4.854 4.854-4.854h227.92c2.67 0 4.854 2.185 4.854 4.854v292.242l297.703-295.641c0.85-0.85 2.185-1.456 3.398-1.456h221.972c4.369 0 6.432 5.219 3.398 8.253l-704.754 704.754M822.446 625.596c-8.738-6.432-23.059-9.709-42.962-9.709h-50.608v89.202h59.104c20.389 0 34.224-6.19 41.628-18.569 4.005-6.796 5.947-16.384 5.947-28.763 0-14.928-4.369-25.607-13.107-32.161M822.446 625.596z"
                          fill="#EEC211"
                          p-id="1366"
                        ></path></svg
                    ></span>
                    <span class="layui-badge layui-bg-blue fly-margin-right" v-if="postInfo.user && postInfo.user.isVip === '1'">VIP{{ postInfo.user ? postInfo.user.isVip : '' }}</span>
                    <span class="date">{{ postInfo.created | formatTime }}</span>
                  </p>
                  <p class="fav">悬赏：{{ postInfo.fav }}积分</p>
                </div>
              </div>
              <div class="operation">
                <router-link
                  tag="button"
                  class="layui-btn"
                  v-if="postInfo.user && userInfo && postInfo.user._id === userInfo._id && postInfo.isEnd === '0'"
                  :to="{ name: 'edit', params: { tid: postInfo._id, postInfo } }"
                  >编辑</router-link
                >
                <button
                  class="layui-btn"
                  :class="{ 'layui-btn-primary': postInfo.isCollect === '1' }"
                  @click="setCollectPost()"
                  v-show="postInfo.user && userInfo && postInfo.user._id !== userInfo._id"
                >
                  {{ postInfo.isCollect === '1' ? '取消收藏' : '收藏' }}
                </button>
              </div>
            </div>
            <div class="post-content" v-casehtml="postInfo.content"></div>
          </div>
          <div class="post-comment ui-panel">
            <h3>评论</h3>
            <div class="comments">
              <div class="not-comments" v-if="!comments.length">
                <img src="../../assets/images/not-comments.png" alt="" />
                <p class="text-center">空空如也，快来占沙发吧...</p>
              </div>
              <div class="comment-item" v-for="(item, index) in comments" :key="'comment' + index">
                <div class="post-user">
                  <div class="info">
                    <div class="pic">
                      <img :src="item.user ? item.user.pic : ''" alt="" />
                    </div>
                    <div class="basic">
                      <p class="user">
                        <span class="name">{{ item.user ? item.user.name : '' }}</span>
                        <span class="vip" v-if="item.user && item.user.isVip === '1'"
                          ><svg t="1601396379570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365" width="200" height="200">
                            <path
                              d="M605.693 867.837h-63.715v-304.621h63.715v304.621M881.428 719.652c-16.991 25.486-43.449 38.108-79.493 38.108h-73.060v110.077h-63.715v-304.621h139.325c29.491 0 52.671 8.738 69.42 26.093 16.869 17.355 25.244 41.142 25.244 71.483 0.122 21.36-5.825 41.021-17.718 58.861M186.383 867.837v-648.685c0-2.67-2.185-4.854-4.854-4.854h-49.637c-2.67 0-4.854-2.185-4.854-4.854v-49.759c0-2.67 2.185-4.854 4.854-4.854h227.92c2.67 0 4.854 2.185 4.854 4.854v292.242l297.703-295.641c0.85-0.85 2.185-1.456 3.398-1.456h221.972c4.369 0 6.432 5.219 3.398 8.253l-704.754 704.754M822.446 625.596c-8.738-6.432-23.059-9.709-42.962-9.709h-50.608v89.202h59.104c20.389 0 34.224-6.19 41.628-18.569 4.005-6.796 5.947-16.384 5.947-28.763 0-14.928-4.369-25.607-13.107-32.161M822.446 625.596z"
                              fill="#EEC211"
                              p-id="1366"
                            ></path></svg
                        ></span>
                        <span class="layui-badge layui-bg-blue" v-if="item.user && item.user.isVip === '1'">VIP{{ item.user ? item.user.isVip : '' }}</span>
                      </p>
                      <p class="date">{{ item.created | formatDate }}</p>
                    </div>
                  </div>
                  <div class="optimum" v-show="item.isBest === '1'">
                    <img src="../../assets/images/optimum.png" alt="" />
                  </div>
                </div>
                <div class="comment-content" v-casehtml="item.content"></div>
                <div class="operation">
                  <div>
                    <span><i class="layui-icon layui-icon-praise" :style="{ color: item.isHands === '1' ? '#009688' : '' }" @click="handsComment(item)"></i>{{ item.hands }}</span>
                    <span><i class="layui-icon layui-icon-reply-fill"></i>回复</span>
                  </div>
                  <div v-if="userInfo && postInfo.isEnd === '0'">
                    <a v-show="item.user._id === userInfo._id" @click.prevent="editComment(item._id, item.content)">编辑</a>
                    <a v-show="item.user._id === userInfo._id" @click.prevent="deleteComment(item._id)">删除</a>
                    <a v-show="postInfo.user._id === userInfo._id && item.user._id !== postInfo.user._id" @click.prevent="bestComment(item)">采纳</a>
                  </div>
                </div>
              </div>
            </div>
            <ui-page :total="total" :size="limit" :current="current" @changePage="handleChange"></ui-page>
          </div>
          <validation-observer ref="observer" v-slot="{ validate }">
            <form class="layui-form layui-form-pane">
              <ui-editor @changeContent="getContent" :initContent="content"></ui-editor>
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
                <button
                  class="layui-btn"
                  type="button"
                  @click="validate().then(submit)"
                  :title="userInfo && userInfo.status !== '0' ? '该用户已被禁言，请联系管理员' : ''"
                  :class="{ 'layui-btn-disabled': userInfo && userInfo.status !== '0' }"
                >
                  {{ updateCid ? '更新' : '发表' }}评论
                </button>
                <button class="layui-btn layui-btn-primary" type="button" v-show="updateCid" @click="cancelUpdate()">取消编辑</button>
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
import { postComment, updateComment, setBest, getComments, setHands } from '@/api/comment'
import { collectPost, getDetail } from '@/api/post'
import { scrollToElem } from '@/utils/common'

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
  props: ['tid'],
  data() {
    return {
      content: '',
      code: '',
      total: 0,
      limit: 10,
      page: 0,
      current: 1,
      postInfo: {},
      comments: [],
      catalogObj: {
        index: '全部',
        ask: '提问',
        advise: '建议',
        discuss: '交流',
        share: '分享',
        news: '动态'
      },
      updateCid: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  watch: {
    tid(newVal, oldVal) {
      this._getDetails()
    }
  },
  methods: {
    _getDetails() {
      getDetail({ tid: this.tid }).then(res => {
        if (res.code === 10000) {
          this.postInfo = res.data
          this._getComments()
        } else {
          this.$alert(res.message)
        }
      })
    },
    getContent(val) {
      this.content = val
    },
    async submit() {
      if (!this.$store.state.isLogin) {
        this.$pop('先登录才能发表评论哦', 'shake')
        return
      }
      if (!this.isNormal()) {
        return
      }
      if (!this.content.trim()) {
        this.$alert('评论内容不能为空')
        return
      }
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.updateCid) {
        updateComment({
          cid: this.updateCid,
          content: this.content,
          sid: this.sid,
          code: this.code
        }).then(res => {
          if (res.code === 10000) {
            this.$pop(res.message)
            const cindex = this.comments.findIndex(item => {
              return item._id === this.updateCid
            })
            this.comments[cindex].content = this.content
            this.updateCid = ''
            this.initEditor()
          } else if (res.code === 9000) {
            this.$refs.codefield.setErrors([res.message])
          } else {
            this.$alert(res.message)
          }
        })
      } else {
        postComment({
          tid: this.postInfo._id,
          content: this.content,
          sid: this.sid,
          code: this.code
        }).then(res => {
          if (res.code === 10000) {
            this.$pop(res.message)
            const userInfo = this.$store.state.userInfo
            const user = {
              name: userInfo.name,
              pic: userInfo.pic,
              isVip: userInfo.isVip,
              _id: userInfo._id
            }
            res.data.user = user
            delete res.data.uid
            if (this.current !== 1) {
              this.current = 1
              this.page = 0
              this._getComments()
            } else if (this.total >= this.limit) {
              this.comments.unshift(res.data)
              this.comments.pop()
            } else {
              this.comments.unshift(res.data)
            }
            scrollToElem('.post-comment', 500, 0)
            this.initEditor()
          } else if (res.code === 9000) {
            this.$refs.codefield.setErrors([res.message])
          } else {
            this.$alert(res.message)
          }
        })
      }
    },
    _getComments() {
      return getComments({ tid: this.tid, page: this.page, limit: this.limit }).then(res => {
        if (res.code === 10000) {
          this.comments = res.data.list
          this.total = res.data.total
        } else {
          this.$alert(res.message)
        }
      })
    },
    async handleChange(pageNumber) {
      this.current = pageNumber
      this.page = pageNumber - 1
      await this._getComments()
      scrollToElem('.post-comment', 500, 0)
    },
    editComment(cid, content) {
      this.content = content
      scrollToElem('.layui-input-block', 500, 0)
      document.getElementById('edit').focus()
      this.updateCid = cid
    },
    deleteComment() {},
    bestComment(commentItem) {
      this.$confirm('你确定要采纳该评论为最佳答案吗？', () => {
        setBest({
          cid: commentItem._id,
          tid: commentItem.tid
        }).then(res => {
          if (res.code === 10000) {
            this.$pop(res.message)
            this.postInfo.isEnd = '1'
            commentItem.isBest = '1'
          } else {
            this.$alert(res.message)
          }
        })
      })
    },
    handsComment(comment) {
      if (this.userInfo) {
        setHands({
          cid: comment._id
        }).then(res => {
          if (res.code === 10000) {
            if (comment.isHands === '1') {
              comment.isHands = '0'
              comment.hands--
            } else {
              comment.isHands = '1'
              comment.hands++
            }
          } else {
            this.$alert(res.message)
          }
        })
      } else {
        this.$pop('请先登录', 'shake')
      }
    },
    setCollectPost() {
      if (!this.userInfo) {
        this.$pop('请先登录', 'shake')
        return
      }
      collectPost(this.postInfo._id).then(res => {
        if (res.code === 10000) {
          this.postInfo.isCollect = this.postInfo.isCollect === '1' ? '0' : '1'
        } else {
          this.$alert(res.message)
        }
      })
    },
    cancelUpdate() {
      this.updateCid = ''
      this.initComment()
    },
    initEditor() {
      this.code = ''
      this.content = ''
      requestAnimationFrame(() => {
        this.$refs.observer && this.$refs.observer.reset()
      })
    },
    isNormal() {
      if (this.userInfo.status === '1') {
        this.$pop('该用户已被禁言', 'shake')
        return false
      } else if (this.userInfo.status === '2') {
        this.$pop('该用户已被冻结', 'shake')
        return false
      }
      return true
    }
  },
  mounted() {
    this._getDetails()
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
    .not-comments {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 80px;
      }
      p {
        color: #999;
        margin-top: 10px;
      }
    }
    .comment-item {
      border-bottom: 1px solid #f2f2f2;
      padding: 10px 0;
      position: relative;
    }
    .post-user {
      background-color: #fff;
      padding: 0;
      margin-bottom: 10px;
    }
    .comment-content {
      padding: 20px 0;
      overflow: hidden;
    }
    .operation {
      display: flex;
      justify-content: space-between;
      color: #999;
      > div:first-child {
        span:first-child {
          margin-right: 10px;
          i:hover {
            color: #009688;
          }
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
    .optimum {
      position: absolute;
      right: 0;
      top: 10px;
      width: 80px;

      img {
        width: 100%;
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
