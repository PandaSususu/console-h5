<template>
  <div class="search" :style="{ width: width }">
    <input type="text" name="title" placeholder="请输入关键字" autocomplete="off" class="layui-input" @input="handleInput($event)" @focus="handleFocus" @blur="handleBlur" ref="search" />
    <button type="button" class="layui-btn layui-btn-danger" @click="handleSearch"><i class="layui-icon layui-icon-search"></i> 搜索</button>
    <ul class="result ui-panel" v-show="show">
      <router-link tag="li" v-for="(item, index) in lists" :key="'search' + index" v-html="item.title" :to="{ name: 'detail', params: { tid: item._id } }"></router-link>
    </ul>
  </div>
</template>

<script>
import { searchDropDownList } from '@/api/index'
import throttle from '@/utils/throttle'

export default {
  name: 'search',
  props: {
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      keyWord: '',
      lists: [],
      show: false
    }
  },
  methods: {
    handleInput: throttle(function(e) {
      this.keyWord = e.target.value
      if (!this.keyWord) {
        return
      }
      searchDropDownList(this.keyWord).then(res => {
        if (res.code === 10000) {
          this.lists = res.data
          for (const post of this.lists) {
            post.title = post.title.replace(new RegExp(this.keyWord, 'g'), `<span style="color: red">${this.keyWord}</span>`)
          }
        } else {
          this.$alert(res.message)
        }
      })
    }, 500),
    handleFocus() {
      this.show = true
      this.$emit('handleFocus')
    },
    handleBlur() {
      setTimeout(() => {
        this.show = false
      }, 100)
      this.$emit('handleBlur')
    },
    handleSearch() {
      this.$emit('handleSearch', this.keyWord)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  margin-right: 20px;
  transition: width 0.3s ease;
  position: relative;

  .result {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    z-index: 999;

    li {
      padding: 0 10px;
      cursor: pointer;
    }

    li:hover {
      background-color: #f2f2f2;
    }
  }
}

.ui-panel {
  padding: 0;
}
</style>
