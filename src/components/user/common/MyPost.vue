<template>
  <table class="layui-table">
    <colgroup>
      <col width="450" />
      <col width="100" />
      <col width="100" />
      <col width="200" />
      <col width="150" />
      <col width="150" />
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
      <tr v-for="(item, index) in list" :key="'post' + index">
        <td style="word-break: break-all"><router-link :to="{ name: 'detail', params: { tid: item._id } }">{{ item.title }}</router-link></td>
        <td class="text-center">{{ item.status === '0' ? '打开' : '关闭' }}</td>
        <td class="text-center">{{ item.isEnd === '0' ? '未结' : '已结' }}</td>
        <td class="text-center">{{ item.created | formatTime }}</td>
        <td class="text-center">{{ item.reads }}阅/{{ item.answer }}答</td>
        <td class="text-center">
          <router-link tag="button" type="button" class="layui-btn layui-btn-sm" :to="{ name: 'edit', params: { tid: item._id, postInfo: item } }">编辑</router-link>
          <button type="button" class="layui-btn layui-btn-danger layui-btn-sm">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getUserPosts } from '@/api/post'

export default {
  name: 'myPosts',
  data() {
    return {
      list: []
    }
  },
  methods: {},
  mounted() {
    getUserPosts().then((res) => {
      if (res.code === 10000) {
        this.list = res.data
      } else {
        this.$alert(res.message)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.layui-table {
  margin: 0;
}
</style>
