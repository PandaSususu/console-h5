<template>
  <table class="layui-table">
    <colgroup>
      <col width="400" />
      <col width="100" />
      <col width="100" />
      <col width="150" />
      <col width="150" />
      <col width="200" />
      <col />
    </colgroup>
    <thead>
      <tr>
        <th>帖子标题</th>
        <th class="text-center">状态</th>
        <th class="text-center">结贴</th>
        <th class="text-center">发表时间</th>
        <th class="text-center">数据</th>
        <th class="text-center">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>文章的测试标题123</td>
        <td class="text-center">打开</td>
        <td class="text-center">未结</td>
        <td class="text-center">2020-10-10</td>
        <td class="text-center">10阅/2答</td>
        <td class="text-center">
          <button type="button" class="layui-btn layui-btn-sm">编辑</button>
          <button type="button" class="layui-btn layui-btn-danger layui-btn-sm">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'my-post',
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.text-center {
  text-align: center;
}

.layui-table {
  margin: 0;
}
</style>
