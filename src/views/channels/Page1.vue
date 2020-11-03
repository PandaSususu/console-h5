<template>
  <div class="layui-container">
    <div class="row">
      <div>
        <ui-list></ui-list>
      </div>
      <div>
        <ui-hotlist></ui-hotlist>
        <ui-ads></ui-ads>
        <ui-links></ui-links>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/contents/List'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'

export default {
  name: 'index',
  components: {
    'ui-list': List,
    'ui-hotlist': HotList,
    'ui-ads': Ads,
    'ui-links': Links
  }
}
</script>

<style lang="scss" scoped>
.list {
  margin-right: 10px;
}

.row {
  display: flex;

  > div:first-child {
    flex: 6;
  }
  > div:last-child {
    flex: 4;
    margin-left: 10px;
  }
}
</style>
