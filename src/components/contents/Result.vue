<template>
  <div>
    <ui-panel></ui-panel>
    <div class="layui-container ui-panel">
      <ui-listitem :lists="lists_" @loadMore="loadMore()" :isEnd="notMore"></ui-listitem>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import { getList } from '@/api/post'
import ListItem from './ListItem'

export default {
  name: 'result',
  components: {
    'ui-listitem': ListItem,
    'ui-panel': Panel
  },
  data() {
    return {
      lists_: [],
      page: 0,
      limit: 20,
      notMore: false,
      isLoad: false,
      keyword: ''
    }
  },
  methods: {
    _getList() {
      this.isLoad = true
      const options = {
        page: this.page,
        limit: this.limit,
        keyword: this.keyword
      }
      getList(options)
        .then(res => {
          this.isLoad = false
          if (res.code === 10000) {
            for (const item of res.data) {
              item.title = item.title.replace(new RegExp(this.keyword, 'g'), `<span style="color: red">${this.keyword}</span>`)
            }
            if (!this.lists_.length) {
              this.lists_ = res.data
            } else {
              this.lists_ = this.lists_.concat(res.data)
              if (res.data.length < this.limit) {
                this.notMore = true
              }
            }
          }
        })
        .catch(error => {
          this.$alert(error.message)
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
    this.keyword = this.$route.params.keyword
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
      &.layui-this {
        color: #009688;
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
</style>
