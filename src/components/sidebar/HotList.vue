<template>
  <div class="ui-panel">
    <h3 class="title">本周热议</h3>
    <ul>
      <li v-for="(item, index) in hotList" :key="'hot' + index">
        <router-link :to="{ name: 'detail', params: { tid: item._id } }">{{ item.title }}</router-link>
        <p><span class="layui-icon layui-icon-dialogue"></span>{{ item.answer }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTopWeek } from '@/api/index'

export default {
  name: 'hotList',
  data() {
    return {
      hotList: []
    }
  },
  mounted() {
    getTopWeek().then((res) => {
      console.log(res)
      this.hotList = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 10px 0;
  line-height: 34px;
  li {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    p {
      float: left;
    }
    p:first-child {
      color: #333;
      font-size: 16px;
      margin-right: 4px;
    }
    p:last-child {
      color: #999;
      font-size: 14px;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
