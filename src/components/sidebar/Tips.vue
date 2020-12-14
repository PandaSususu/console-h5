<template>
  <div class="ui-panel tips">
    <h3 class="title">热门技术</h3>
    <ul class="layui-row  layui-col-space10">
      <li class="layui-col-md6" v-for="(item, index) in tipsList" :key="'tips' + index"><a :href="item.link" :target="item.openType">{{ item.title }}</a></li>
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
      this.tipsList = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.tips {
  overflow: hidden;
}
ul {
  overflow: hidden;
  padding: 10px 0;
  li {
    height: 50px;
    text-align: center;

    a {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 42px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      border: 1px solid #f2f2f2;

      &:hover {
        color: #009688;
      }
    }
  }
}
</style>
