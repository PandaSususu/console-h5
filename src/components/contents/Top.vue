<template>
  <div>
    <div class="ui-panel">
      <h3 class="title">置顶</h3>
      <ui-listitem :lists="list"></ui-listitem>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem'

export default {
  name: 'top',
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
          display: inline-block;
          border: 1px solid #2bd5b3;
          font-size: 12px;
          padding: 1px 2px;
          border-radius: 4px;
          color: #2bd5b3;
          margin-right: 4px;
        }
      }

      .tags {
        font-size: 14px;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 300px;

        .user {
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            font-size: 12px;
            padding: 1px 2px;
            border-radius: 4px;
            color: #2bd5b3;
            margin-right: 4px;
            background-color: #dd4822;
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
          padding: 3px 3px;
          color: #fff;
          font-size: 12px;
          border-radius: 4px;
        }
      }
    }
    .count {
      display: flex;
      align-items: flex-end;

      span {
        margin-right: 6px;
      }
    }
  }
}
</style>
