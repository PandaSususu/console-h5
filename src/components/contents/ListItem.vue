<template>
  <div>
    <ul>
      <li class="list-item cursor" v-for="(item, index) in items" :key="'list' + index">
        <div class="pic" v-if="item.user" @click="detail(item._id)">
          <img :src="item.user.pic" alt="" />
        </div>
        <div class="content">
          <div class="info">
            <p class="news-title" @click="detail(item._id)">
              <span class="layui-badge-rim">{{ catalogs[item.catalog] }}</span>
              {{ item.title }}
            </p>
            <div class="tags">
              <p>{{ item.user.name }}</p>
              <p class="user" v-if="item.user && item.user.isVip !== '0'">
                <span><svg t="1601396379570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365" width="200" height="200">
                    <path
                      d="M605.693 867.837h-63.715v-304.621h63.715v304.621M881.428 719.652c-16.991 25.486-43.449 38.108-79.493 38.108h-73.060v110.077h-63.715v-304.621h139.325c29.491 0 52.671 8.738 69.42 26.093 16.869 17.355 25.244 41.142 25.244 71.483 0.122 21.36-5.825 41.021-17.718 58.861M186.383 867.837v-648.685c0-2.67-2.185-4.854-4.854-4.854h-49.637c-2.67 0-4.854-2.185-4.854-4.854v-49.759c0-2.67 2.185-4.854 4.854-4.854h227.92c2.67 0 4.854 2.185 4.854 4.854v292.242l297.703-295.641c0.85-0.85 2.185-1.456 3.398-1.456h221.972c4.369 0 6.432 5.219 3.398 8.253l-704.754 704.754M822.446 625.596c-8.738-6.432-23.059-9.709-42.962-9.709h-50.608v89.202h59.104c20.389 0 34.224-6.19 41.628-18.569 4.005-6.796 5.947-16.384 5.947-28.763 0-14.928-4.369-25.607-13.107-32.161M822.446 625.596z"
                      fill="#EEC211"
                      p-id="1366"
                    ></path></svg
                  ></span>
                  <span class="layui-badge">VIP{{ item.user.isVip }}</span>
              </p>
              <span class="created">{{ item.created | formatDate }}</span>
              <span class="favs"
                ><svg t="1601371362583" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3938" width="200" height="200">
                  <path
                    d="M780.97 144.725a40.96 40.96 0 0 1 34.836 19.415l146.09 236.202c9.654 15.608 7.748 35.73-4.664 49.249L543.536 900.15c-16.14 17.578-43.831 17.691-60.115 0.245L62.9 449.836c-12.65-13.553-14.62-33.913-4.802-49.639l147.456-236.202a40.96 40.96 0 0 1 34.746-19.27z m-22.828 81.92h-495.13l-118.78 190.273L513.12 812.155l362.782-395.111-117.76-190.399zM633.515 401.408c22.621 0 40.96 18.338 40.96 40.96s-18.339 40.96-40.96 40.96H382.293c-22.621 0-40.96-18.338-40.96-40.96s18.339-40.96 40.96-40.96h251.222z"
                    p-id="3939"
                    fill="#F76809"
                  ></path></svg
                >{{ item.fav }}</span
              >
              <span class="layui-badge" :class="item.isEnd === '0' ? 'layui-bg-orange' : 'layui-bg-green'">{{ item.isEnd === '0' ? '未结' : '已结' }}</span>
            </div>
          </div>
          <div class="label">
            <p class="labs">
              <span class="layui-badge" v-for="(label, index) in item.tags" :key="'lable' + index" :class="label.class">{{ label.name }}</span>
            </p>
            <p class="count"><span class="layui-icon layui-icon-dialogue"></span>{{ item.answer }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="more" v-if="items.length > 19">
      <button class="layui-btn" @click="loadMore()" v-if="!isEnd">加载更多</button>
      <p v-else>这就是我的底线...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listItem',
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items() {
      return this.lists
    }
  },
  data() {
    return {
      catalogs: {
        index: '全部',
        ask: '提问',
        advise: '建议',
        discuss: '讨论',
        share: '分享',
        news: '动态',
        notice: '公告'
      }
    }
  },
  methods: {
    loadMore() {
      this.$emit('loadMore')
    },
    detail(tid) {
      this.$router.push({ path: `/detail/${tid}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
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
    overflow: hidden;
    border-radius: 4px;

    img {
      width: 100%;
    }
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
        transition: color .2s ease;

        &:hover {
          color: #FF6600;
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
            display: flex;
            align-items: center;
            svg {
              width: 20px;
              height: 20px;
              margin-right: 2px;
            }
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
        }
      }
    }
    .label {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      .labs {
        span {
          margin-left: 4px;
        }
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

.more {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>
