<template>
  <div class="ui-panel">
    <h3 class="title">友情链接</h3>
    <ul>
      <li v-for="(item, index) in links" :key="'link' + index"><a :href="item.link">{{ item.title }}</a></li>
    </ul>
  </div>
</template>

<script>
import { getLinks } from '@/api/home'

export default {
  name: 'links',
  data() {
    return {
      links: []
    }
  },
  mounted() {
    getLinks().then((res) => {
      console.log(res)
      this.links = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
ul {
  overflow: hidden;
  line-height: 40px;
  li {
    float: left;
    margin-right: 15px;
  }
  li:last-child a {
    color: #11C2EE;
  }
}
</style>
