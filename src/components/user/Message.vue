<template>
  <div class="ui-panel">
    <div class="clear-message">
      <button type="button" class="layui-btn layui-btn-danger" @click="clear()">清空全部消息</button>
    </div>
    <div class="message">
      <ul>
        <li>
          <div><span>张三</span>回答了您的求解<span>layui后台框架</span></div>
          <div>
            <span>1小时前</span>
            <button type="button" class="layui-btn layui-btn-danger layui-btn-sm">删除</button>
          </div>
        </li>
        <li>
          <div><span>张三</span>回答了您的求解<span>layui后台框架</span></div>
          <div>
            <span>1小时前</span>
            <button type="button" class="layui-btn layui-btn-danger layui-btn-sm">删除</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-message',
  data() {
    return {}
  },
  methods: {
    clear() {
      this.$confirm('你确定要清空消息记录吗？', () => {
        this.$pop('清空成功', '', 2000)
      })
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.ui-panel {
  margin-bottom: 0;
}
.clear-message {
  margin: 20px 0;
}
.message {
  ul {
    li {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      div:first-child {
        line-height: 30px;
        border-left: 6px solid #009688;
        background-color: #f2f2f2;
        padding: 10px 10px;
        margin-bottom: 10px;
        span {
          color: #2B91D5;
        }
      }
      div:last-child {
        display: flex;
        justify-content: space-between;

        span {
          color: #999;
        }
      }
    }
  }
}
</style>
