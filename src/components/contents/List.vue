<template>
  <div>
    <div class="ui-panel">
      <div class="nav">
        <ul>
          <li>综合</li>
          <li><span class="line"></span></li>
          <li>未结</li>
          <li><span class="line"></span></li>
          <li>已结</li>
          <li><span class="line"></span></li>
          <li>精华</li>
        </ul>
        <ul>
          <li>按最新</li>
          <li><span class="line"></span></li>
          <li>按热议</li>
        </ul>
      </div>
      <ui-listitem :lists="list"></ui-listitem>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem'

export default {
  name: 'list',
  components: {
    'ui-listitem': ListItem
  },
  data() {
    return {
      list: [
        {
          tid: '1',
          title: '帖子标题',
          catalog: 'index',
          favs: 2,
          created: '2020-09-28',
          isEnd: '0',
          reads: 50,
          answer: 10,
          status: '0',
          isTop: '0',
          topNum: '0',
          tags: [
            {
              name: '精华',
              class: 'layui-bg-red'
            },
            {
              name: '精华',
              class: 'layui-bg-orange'
            },
            {
              name: '精华',
              class: 'layui-bg-cyan'
            }
          ],
          user: {
            id: '用户id',
            isVip: '1',
            name: '用户名',
            pic: 'http://xxxx.jpg'
          }
        },
        {
          tid: '1',
          title: '帖子标题',
          catalog: 'index',
          favs: 2,
          created: '2020-09-28',
          isEnd: '0',
          reads: 50,
          answer: 10,
          status: '0',
          isTop: '0',
          topNum: '0',
          tags: [
            {
              name: '精华',
              class: 'layui-bg-red'
            },
            {
              name: '精华',
              class: 'layui-bg-orange'
            },
            {
              name: '精华',
              class: 'layui-bg-cyan'
            }
          ],
          user: {
            id: '用户id',
            isVip: '1',
            name: '用户名',
            pic: 'http://xxxx.jpg'
          }
        },
        {
          tid: '1',
          title: '帖子标题',
          catalog: 'index',
          favs: 2,
          created: '2020-09-28',
          isEnd: '0',
          reads: 50,
          answer: 10,
          status: '0',
          isTop: '0',
          topNum: '0',
          tags: [
            {
              name: '精华',
              class: 'layui-bg-red'
            },
            {
              name: '精华',
              class: 'layui-bg-orange'
            },
            {
              name: '精华',
              class: 'layui-bg-cyan'
            }
          ],
          user: {
            id: '用户id',
            isVip: '1',
            name: '用户名',
            pic: 'http://xxxx.jpg'
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  display: inline-block;
  font-size: 12px;
  padding: 1px 2px;
  border-radius: 4px;
}

.nav {
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
  ul {
    line-height: 40px;
    display: flex;
    li {
      cursor: pointer;
      padding: 0;
      height: 40px;

      .line {
        display: inline-block;
        width: 2px;
        height: 10px;
        background-color: #ddd;
        margin: 0 20px 0 10px;
        vertical-align: middle;
      }
    }
  }

  p {
    float: right;
    line-height: 40px;
    font-size: 12px;
    color: #999;
    span {
      color: #e6941a;
    }
  }
}

li {
  overflow: hidden;
  padding: 10px 0;
  height: 60px;
  border-bottom: 1px solid #f2f2f2;
  .pic {
    width: 60px;
    height: 60px;
    background-color: #ddd;
    float: left;
    margin-right: 10px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 60px;
      .news-title {
        color: #333;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        span {
          border: 1px solid #2bd5b3;
          color: #2bd5b3;
          margin-right: 4px;
        }
      }

      .tags {
        font-size: 14px;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 300px;

        .user {
          display: flex;
          align-items: center;
          span {
            background-color: #d54d2b;
            color: #fff;
            margin-left: 4px;
          }

          svg {
            width: 20px;
            height: 20px;
            margin-right: 2px;
          }
        }

        .favs {
          color: #f76809;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            width: 16px;
            height: 16px;
            margin-right: 2px;
          }
        }

        .end {
          background-color: #4db38a;
          color: #fff;
          font-size: 12px;
        }
      }
    }
    .label {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      > span {
        color: #fff;
        background-color: #e6941a;
      }
      .count {
        display: flex;
        align-items: flex-end;

        span {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
