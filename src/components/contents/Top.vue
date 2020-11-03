<template>
  <div>
    <div class="ui-panel">
      <h3 class="title">置顶</h3>
      <ui-listitem :lists="lists_" @loadMore="loadMore()" :isEnd="isEnd_"></ui-listitem>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/index'
import ListItem from './ListItem'

export default {
  name: 'top',
  components: {
    'ui-listitem': ListItem
  },
  data() {
    return {
      lists_: [],
      isTop: '1',
      page: 0,
      limit: 19,
      catalog: '',
      sort: 'created',
      status: '',
      tag: '',
      isEnd_: false,
      isLoad: false
    }
  },
  methods: {
    _getList() {
      this.isLoad = true
      const options = {
        isTop: this.isTop,
        page: this.page,
        limit: this.limit,
        catalog: this.catalog,
        sort: this.sort,
        status: this.status,
        tag: this.tag
      }
      getList(options).then((res) => {
        this.isLoad = false
        if (res.code === 200) {
          if (res.data.length < this.limit) {
            this.isEnd_ = true
          }
          if (!this.lists_.length) {
            this.lists_ = res.data
          } else {
            this.lists_ = this.lists_.concat(res.data)
          }
        }
      }).catch((error) => {
        this.$alert(error)
        this.isLoad = false
      })
    },
    loadMore() {
      if (this.isLoad) return
      this.page++
      this._getList()
    }
  },
  mounted() {
    this._getList()
  }
}
</script>

<style lang="scss" scoped>
li {
  overflow: hidden;
  padding: 10px 0;
  height: 60px;
  border-bottom: 1px solid #f2f2f2;
  .pic {
    width: 60px;
    height: 60px;
    background-color: #ddd;
    float: left;
    margin-right: 10px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 60px;
      .news-title {
        color: #333;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        span {
          display: inline-block;
          border: 1px solid #2bd5b3;
          font-size: 12px;
          padding: 1px 2px;
          border-radius: 4px;
          color: #2bd5b3;
          margin-right: 4px;
        }
      }

      .tags {
        font-size: 14px;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 300px;

        .user {
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            font-size: 12px;
            padding: 1px 2px;
            border-radius: 4px;
            color: #2bd5b3;
            margin-right: 4px;
            background-color: #dd4822;
            color: #fff;
            margin-left: 4px;
          }

          svg {
            width: 20px;
            height: 20px;
            margin-right: 2px;
          }
        }

        .favs {
          color: #f76809;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            width: 16px;
            height: 16px;
            margin-right: 2px;
          }
        }

        .end {
          background-color: #4db38a;
          padding: 3px 3px;
          color: #fff;
          font-size: 12px;
          border-radius: 4px;
        }
      }
    }
    .count {
      display: flex;
      align-items: flex-end;

      span {
        margin-right: 6px;
      }
    }
  }
}
</style>
