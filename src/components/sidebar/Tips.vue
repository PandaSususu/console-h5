<template>
  <div class="ui-panel">
    <h3 class="title">温馨通道</h3>
    <ul>
      <li class="layui-col-xs6" v-for="(item, index) in tipsList" :key="'tips' + index"><a :href="link">{{ item.title }}</a></li>
    </ul>
  </div>
</template>

<script>
import { getTips } from '@/api/index'

export default {
  name: 'tips',
  data() {
    return {
      tipsList: []
    }
  },
  mounted() {
    getTips().then((res) => {
      console.log(res)
      this.tipsList = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
ul {
  border: 1px solid #f2f2f2;
  overflow: hidden;
  margin: 10px 0;
  border-right: none;
  border-bottom: none;
  li {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-right: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 6px;

    a {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &:hover {
        color: #009688;
      }
    }
  }
}
</style>
