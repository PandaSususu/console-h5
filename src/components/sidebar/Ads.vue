<template>
  <div class="ui-panel ads">
    <h3 class="title">推荐课程</h3>
    <ul>
      <li>3秒钟精通Vue</li>
      <li>你想成为真男人吗？</li>
    </ul>
  </div>
</template>

<script>
import { getAds } from '@/api/index'

export default {
  name: 'ads',
  mounted() {
    getAds().then(res => {
      console.log(res)
      this.links = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.ads {
  overflow: hidden;
}
ul {
  li {
    background-color: #ddd;
    text-align: center;
    line-height: 40px;
    margin-bottom: 10px;
  }
}
</style>
