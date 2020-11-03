<template>
  <div>
    <ui-panel></ui-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  name: 'home',
  components: {
    'ui-panel': Panel
  }
}
</script>

<style lang="scss" scoped></style>
