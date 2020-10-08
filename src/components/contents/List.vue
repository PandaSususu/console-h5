<template>
  <div>
    <div class="ui-panel">
      <div class="nav">
        <ul>
          <li @click="search()">综合</li>
          <li><span class="line"></span></li>
          <li @click="search(0)">未结</li>
          <li><span class="line"></span></li>
          <li @click="search(1)">已结</li>
          <li><span class="line"></span></li>
          <li @click="search(2)">精华</li>
        </ul>
        <ul>
          <li @click="search(3)">按最新</li>
          <li><span class="line"></span></li>
          <li @click="search(4)">按热议</li>
        </ul>
      </div>
      <ui-listitem :lists="lists_" @loadMore="loadMore()" :isEnd="isEnd_"></ui-listitem>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/home'
import ListItem from './ListItem'

export default {
  name: 'list',
  components: {
    'ui-listitem': ListItem
  },
  data() {
    return {
      lists_: [],
      isTop: '0',
      page: 0,
      limit: 19,
      catalog: '',
      sort: '',
      status: '',
      tag: '',
      isEnd_: false,
      isLoad: false,
      current: undefined
    }
  },
  watch: {
    current(newval, oldval) {
      this.init()
      this._getList()
    },
    '$route'(newval, oldval) {
      this.catalog = newval.params.catalog
      this.init()
      this._getList()
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
        this.$alert(error.message)
        this.isLoad = false
      })
    },
    loadMore() {
      if (this.isLoad) return
      this.page++
      this._getList()
    },
    search(val) {
      if (this.current === val) {
        return
      }
      this.current = val
      switch (val) {
        case 0:
          this.status = '0'
          this.tag = ''
          break
        case 1:
          this.status = '1'
          this.tag = ''
          break
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        case 3:
          this.sort = 'created'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.tag = ''
          this.status = ''
          break
      }
    },
    init() {
      this.lists_ = []
      this.isEnd_ = false
    }
  },
  mounted() {
    this._getList()
  }
}
</script>

<style lang="scss" scoped>
.tag {
  display: inline-block;
  font-size: 12px;
  padding: 1px 2px;
  border-radius: 4px;
}

.nav {
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
  ul {
    line-height: 40px;
    display: flex;
    li {
      cursor: pointer;
      padding: 0;
      height: 40px;

      .line {
        display: inline-block;
        width: 2px;
        height: 10px;
        background-color: #ddd;
        margin: 0 20px 0 10px;
        vertical-align: middle;
      }
    }
  }

  p {
    float: right;
    line-height: 40px;
    font-size: 12px;
    color: #999;
    span {
      color: #e6941a;
    }
  }
}

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
          border: 1px solid #2bd5b3;
          color: #2bd5b3;
          margin-right: 4px;
        }
      }

      .tags {
        font-size: 14px;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 300px;

        .user {
          display: flex;
          align-items: center;
          span {
            background-color: #d54d2b;
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
          color: #fff;
          font-size: 12px;
        }
      }
    }
    .label {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      > span {
        color: #fff;
        background-color: #e6941a;
      }
      .count {
        display: flex;
        align-items: flex-end;

        span {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
