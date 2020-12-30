<template>
  <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
    <ul class="layui-tab-title">
      <li :class="{ 'layui-this': type === 'comment' }" @click="getTypeMsg('comment')">
        评论<span class="layui-badge" v-show="msgNum.comment">{{ msgNum.comment }}</span>
      </li>
      <li :class="{ 'layui-this': type === 'collect' }" @click="getTypeMsg('collect')">
        收藏<span class="layui-badge" v-show="msgNum.collect">{{ msgNum.collect }}</span>
      </li>
      <li :class="{ 'layui-this': type === 'hands' }" @click="getTypeMsg('hands')">
        点赞<span class="layui-badge" v-show="msgNum.hands">{{ msgNum.hands }}</span>
      </li>
    </ul>
    <div class="layui-tab-content">
      <div class="message">
        <ul>
          <li v-for="(item, index) in lists" :key="'comment' + index">
            <template v-if="type === 'comment'">
              <div>
                <span>{{ item.uid.name }}</span
                >评论了您的帖子<router-link tag="span" :to="{ name: 'detail', params: { tid: item.tid._id } }">{{ item.tid.title }}</router-link>
              </div>
              <div class="content" v-casehtml="item.content"></div>
            </template>
            <template v-if="type === 'collect'">
              <div>
                <span>{{ item.uid.name }}</span
                >收藏了您的帖子<router-link tag="span" :to="{ name: 'detail', params: { tid: item.tid._id } }">{{ item.tid.title }}</router-link>
              </div>
            </template>
            <template v-if="type === 'hands'">
              <div>
                <span>{{ item.uid.name }}</span
                >点赞了您的评论<span>{{ item.cid.content }}</span>
              </div>
            </template>
            <div>
              <span>{{ item.created | formatDate }}</span>
              <span class="layui-badge-dot layui-bg-green" v-show="item.isRead === '0'"></span>
            </div>
          </li>
        </ul>
        <ui-page :total="total" :size="limit" :current="current" @changePage="handleChange"></ui-page>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserMessages } from '@/api/user'
import { mapState } from 'vuex'

import Page from '@/components/modules/paging/Paging'
import { scrollToElem } from '@/utils/common'

export default {
  name: 'UserMessage',
  components: {
    'ui-page': Page
  },
  data() {
    return {
      total: 0,
      limit: 10,
      page: 0,
      current: 1,
      lists: [],
      type: 'comment'
    }
  },
  computed: {
    ...mapState(['msgNum'])
  },
  methods: {
    clear() {
      this.$confirm('你确定要清空消息记录吗？', () => {
        this.$pop('清空成功', '', 2000)
      })
    },
    async handleChange(pageNumber) {
      this.current = pageNumber
      this.page = pageNumber - 1
      await this.getMessages()
      scrollToElem('body', 500, 0)
    },
    getMessages() {
      getUserMessages({
        page: this.page,
        limit: this.limit,
        type: this.type
      }).then(res => {
        if (res.code === 10000) {
          this.lists = res.data
          this.total = res.total
          let num = 0
          res.data.forEach(item => {
            if (item.isRead === '0') {
              num++
            }
          })
          this.msgNum.total -= num
          this.msgNum[this.type] -= num
        } else {
          this.$alert(res.message)
        }
      })
    },
    getTypeMsg(value) {
      this.type = value
      this.page = 0
      this.total = 0
      this.current = 1
      this.lists = []
      this.getMessages()
    }
  },
  mounted() {
    this.getMessages()
  }
}
</script>
<style lang="scss" scoped>
.layui-tab {
  margin: 0;
  display: flex;
  flex-direction: column;

  .layui-tab-content {
    flex: 1;
    background-color: #fff;
  }
}
.message {
  ul {
    li {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;

      div:first-child {
        line-height: 30px;
        border-left: 6px solid #009688;
        background-color: #f2f2f2;
        padding: 10px 10px;
        span {
          color: #2b91d5;
        }
      }
      .content {
        margin: 10px 0;
      }
      div:last-child {
        display: flex;
        align-items: center;

        span {
          color: #999;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
