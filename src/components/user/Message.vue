<template>
  <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
    <ul class="layui-tab-title">
      <li :class="{ 'layui-this': type === 'comment' }" @click="getTypeMsg('comment')">评论</li>
      <li :class="{ 'layui-this': type === 'collect' }" @click="getTypeMsg('collect')">收藏</li>
      <li :class="{ 'layui-this': type === 'hands' }" @click="getTypeMsg('hands')">点赞</li>
    </ul>
    <div class="layui-tab-content">
      <div>
        <div class="clear-message">
          <button type="button" class="layui-btn layui-btn-danger" @click="clear()" v-show="total">全部已读</button>
        </div>
        <div class="message">
          <ul>
            <li v-for="(item, index) in lists" :key="'comment' + index">
              <div>
                <span>{{ item.uid.name }}</span
                >{{ types[type] }}了您的帖子<router-link tag="span" :to="{ name: 'detail', params: { tid: item.tid._id } }">{{ item.tid.title }}</router-link>
              </div>
              <div class="content" v-casehtml="item.content"></div>
              <div>
                <span>{{ item.created | formatDate }}</span>
                <button type="button" class="layui-btn layui-btn-danger layui-btn-sm">未读</button>
              </div>
            </li>
          </ul>
          <ui-page :total="total" :size="limit" :current="current" @changePage="handleChange"></ui-page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserMessages } from '@/api/user'

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
      type: 'comment',
      types: {
        comment: '评论',
        collect: '收藏',
        hands: '点赞'
      }
    }
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

  .clear-message {
    margin-bottom: 20px;
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
        justify-content: space-between;

        span {
          color: #999;
        }
      }
    }
  }
}
</style>
