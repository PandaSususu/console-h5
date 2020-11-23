<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space10">
      <div class="layui-col-md8">
        <ui-top></ui-top>
        <ui-list></ui-list>
      </div>
      <div class="layui-col-md4">
        <ui-tips></ui-tips>
        <ui-sign></ui-sign>
        <ui-hotlist></ui-hotlist>
        <ui-ads></ui-ads>
        <ui-links></ui-links>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/contents/List'
import Top from '@/components/contents/Top'
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'

export default {
  name: 'index',
  components: {
    'ui-list': List,
    'ui-top': Top,
    'ui-tips': Tips,
    'ui-sign': Sign,
    'ui-hotlist': HotList,
    'ui-ads': Ads,
    'ui-links': Links
  }
}
</script>

<style lang="scss" scoped></style>
