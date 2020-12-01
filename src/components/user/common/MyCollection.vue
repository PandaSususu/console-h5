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
      <tr v-for="(item, index) in posts" :key="'post' + index">
        <td><router-link :to="{ name: 'detail', params: { tid: item.post._id } }">{{ item.post.title }}</router-link></td>
        <td class="text-center">{{ item.post.status === '0' ? '打开' : '关闭' }}</td>
        <td class="text-center">{{ item.post.isEnd === '0' ? '未结' : '已结' }}</td>
        <td class="text-center">{{ item.post.created | formatTime }}</td>
        <td class="text-center">{{ item.post.reads }}阅/{{ item.post.answer }}答</td>
        <td class="text-center">
          <button type="button" class="layui-btn layui-btn-sm">编辑</button>
          <button type="button" class="layui-btn layui-btn-danger layui-btn-sm">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getUserCollerctPosts } from '@/api/post'

export default {
  name: 'my-collection',
  data() {
    return {
      posts: []
    }
  },
  methods: {},
  mounted() {
    getUserCollerctPosts().then((res) => {
      if (res.code === 10000) {
        this.posts = res.data
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
