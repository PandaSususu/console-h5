<template>
  <div>
    <div class="ui-panel">
      <div class="nav">
        <ul>
          <li @click="search('all')" :class="{ 'layui-this': !isEnd && !tag }">综合</li>
          <li><span class="line"></span></li>
          <li @click="search('isEnd', '0')" :class="{ 'layui-this': isEnd === '0' }">未结</li>
          <li><span class="line"></span></li>
          <li @click="search('isEnd', '1')" :class="{ 'layui-this': isEnd === '1' }">已结</li>
          <li><span class="line"></span></li>
          <li @click="search('tag', '精华')" :class="{ 'layui-this': tag === '精华' }">精华</li>
        </ul>
        <ul>
          <li @click="search('sort', 'created')" :class="{ 'layui-this': sort === 'created' }">按最新</li>
          <li><span class="line"></span></li>
          <li @click="search('sort', 'answer')" :class="{ 'layui-this': sort === 'answer' }">按热议</li>
        </ul>
      </div>
      <ui-listitem :lists="lists_" @loadMore="loadMore()" :isEnd="notMore"></ui-listitem>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/post'
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
      limit: 20,
      catalog: '',
      sort: 'created',
      isEnd: '',
      tag: '',
      notMore: false,
      isLoad: false
    }
  },
  computed: {},
  watch: {
    $route(newval, oldval) {
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
        isEnd: this.isEnd,
        tag: this.tag
      }
      getList(options)
        .then(res => {
          this.isLoad = false
          if (res.code === 10000) {
            if (res.data.length < this.limit) {
              this.notMore = true
            }
            if (!this.lists_.length) {
              this.lists_ = res.data
            } else {
              this.lists_ = this.lists_.concat(res.data)
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
    },
    search(flag, val) {
      if (this.sort === val) return
      if (this.isEnd === val) {
        this.isEnd = ''
        this.lists_ = []
        this._getList()
        return
      }
      if (this.tag === val) {
        this.tag = ''
        this.lists_ = []
        this._getList()
        return
      }
      switch (flag) {
        case 'all':
          this.isEnd = ''
          this.tag = ''
          break
        case 'isEnd':
          this.isEnd = val
          break
        case 'tag':
          this.tag = val
          break
        case 'sort':
          this.sort = val
      }
      this.lists_ = []
      this._getList()
    },
    init() {
      this.lists_ = []
      this.notMore = false
    }
  },
  mounted() {
    this.catalog = this.$route.params.catalog ? this.$route.params.catalog : ''
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
