<template>
  <div>
    <ui-panel></ui-panel>
    <div class="layui-container">
      <div class="row">
        <div>
          <ui-list></ui-list>
        </div>
        <div>
          <ui-tips></ui-tips>
          <ui-sign></ui-sign>
          <ui-hotlist></ui-hotlist>
          <ui-ads></ui-ads>
          <ui-links></ui-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import List from '@/components/contents/List'
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'

export default {
  name: 'home',
  components: {
    'ui-panel': Panel,
    'ui-list': List,
    'ui-tips': Tips,
    'ui-sign': Sign,
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

    >div:first-child {
      flex: 6;
    }
    >div:last-child {
      flex: 4;
      margin-left: 10px;
    }
  }
</style>
