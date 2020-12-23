<template>
  <div :class="{ 'flex-center': position === 'center', 'flex-left': position === 'left', 'flex-right': position === 'right' }" class="page-box" v-show="total > size">
    <div class="layui-box layui-laypage layui-laypage-default">
      <a href="javascript:;" v-show="showHT" :class="{ 'layui-disabled': current === 1 }" @click="firstPage()">
        <i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>
      <a href="javascript:;" class="layui-laypage-prev" :class="{ 'layui-disabled': current === 1 }" @click="prev()">
        <i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>

      <a href="javascript:;" v-if="pages.length > 5 && current - 2 > 1">...</a>
      <template v-for="(item, index) in pages">
        <a href="javascript:;" :key="'page' + index" :class="current - 1 === index ? theme : ''" v-if="item >= (current - 2) && item  <=(current + 2)" @click="changePage(item)">{{ item }}</a>
      </template>
      <a href="javascript:;" v-if="pages.length > 5 && current + 2 < pages.length">...</a>

      <a href="javascript:;" class="layui-laypage-next" :class="{ 'layui-disabled': current === pages.length }" @click="next()">
        <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
        <template v-else>下一页</template>
      </a>
      <a href="javascript:;" v-show="showHT" :class="{ 'layui-disabled': current === pages.length }" @click="lastPage()">
        <i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="has-total" v-if="hasTotal">到第<input type="text" @keyup="jumpPage"/>页 共{{ pages.length }}页</div>
    <div class="has-select" v-if="hasSelect">
      <div class="layui-input-inline" @click="isSelect = !isSelect">
        <div class="layui-unselect layui-form-select" :class="{ 'layui-form-selected': isSelect }">
          <div class="layui-select-title">
            <input type="text" placeholder="请选择" readonly class="layui-input layui-unselect" v-model="options[optionIndex]" />
            <i class="layui-edge"></i>
          </div>
          <dl class="layui-anim layui-anim-upbit">
            <dd v-for="(item, index) in options" :key="'fav' + index" :class="{ 'layui-this': optionIndex === index }" @click="choice(index)">
              {{ item }}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    position: {
      type: String,
      default: 'center'
    },
    showHT: {
      type: Boolean,
      default: true
    },
    showType: {
      type: String,
      default: 'icon'
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: true
    },
    hasSelect: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    },
    current: {
      type: Number,
      default: 0
    }
  },
  watch: {
    total(newVal, oldVal) {
      this.initPages()
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit)
    }
  },
  data() {
    return {
      isSelect: false,
      options: [10, 20, 30, 50, 100],
      optionIndex: 0,
      pages: [],
      limit: 0
    }
  },
  mounted() {
    this.limit = this.size
    this.initPages()
    this.initSelect()
  },
  methods: {
    initPages() {
      const len = this.totalPages
      this.pages = _.range(1, len + 1)
    },
    initSelect() {
      if (this.options.indexOf(this.size) === -1) {
        this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
      }
      this.optionIndex = this.options.indexOf(this.size)
    },
    choice(index) {
      this.optionIndex = index
      this.$emit('changePage', Math.floor(this.current * this.limit / this.options[this.optionIndex]))
      this.limit = this.options[this.optionIndex]
      this.initPages(this.limit)
    },
    jumpPage(e) {
      if (e.keyCode === 13) {
        this.current = parseInt(e.target.value)
      }
    },
    next() {
      this.current < this.pages.length ? this.$emit('changePage', this.current + 1) : this.$emit('changePage', this.pages.length)
    },
    prev() {
      this.current > 1 ? this.$emit('changePage', this.current - 1) : this.$emit('changePage', 1)
    },
    firstPage() {
      this.$emit('changePage', 1)
    },
    lastPage() {
      this.$emit('changePage', this.pages.length)
    },
    changePage(pageNumber) {
      this.$emit('changePage', pageNumber)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  &.flex-center {
    justify-content: center;
  }
  &.flex-left {
    justify-content: flex-start;
  }
  &.flex-right {
    justify-content: flex-end;
  }
}

.has-total {
  margin: 0 0 5px 8px;
  font-size: 12px;
  color: #333;

  input {
    width: 40px;
    height: 26px;
    text-align: center;
    margin: 0 4px;
  }
}

.has-select {
  margin-left: 8px;
  input {
    height: 30px;
    width: 80px;
    margin-top: -3px;
    text-align: center;
  }
}
</style>
