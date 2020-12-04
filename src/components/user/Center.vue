<template>
  <div class="ui-panel user-center">
    <div class="title">欢迎回来，亲爱的{{ userInfo.name }}</div>
    <div class="info">
      <div class="account ui-panel">
        <div class="my">我的会账户息</div>
        <div class="experience">
          <p>积分经验值：<span>{{ userInfo.favs }}</span></p>
          <p v-if="userInfo.isVip !== '0'">您当前为：<span>VIP{{ userInfo.isVip }}</span></p>
          <button class="layui-btn layui-btn-warm layui-btn-sm" v-else>去开通会员</button>
        </div>
      </div>
      <ui-sign></ui-sign>
    </div>
    <div class="shortcut ui-panel">
      <div class="quick">快捷方式</div>
      <div class="operate">
        <ul class="layui-row layui-col-space10">
          <li class="layui-col-sm3 layui-col-xs4" v-for="(item, index) in operations" :key="'operation' + index">
            <a href="" @click.prevent="open(item.isComplete, item.path)">
              <div>
                <i class="layui-icon" :class="item.icon"></i>
              </div>
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from '@/components/sidebar/Sign'
import { getInfo } from '@/api/user'

export default {
  name: 'user-center',
  components: {
    'ui-sign': Sign
  },
  data() {
    return {
      operations: [
        {
          name: '修改信息',
          icon: 'layui-icon-set',
          path: 'setting',
          isComplete: true
        },
        {
          name: '修改头像',
          icon: 'layui-icon-face-smile',
          path: 'picupload',
          isComplete: true
        },
        {
          name: '修改密码',
          icon: 'layui-icon-password',
          path: 'password',
          isComplete: true
        },
        {
          name: '账户绑定',
          icon: 'layui-icon-username',
          path: 'accounts',
          isComplete: true
        },
        {
          name: '发表新帖',
          icon: 'layui-icon-addition',
          path: 'add',
          isComplete: true
        },
        {
          name: '查看分享',
          icon: 'layui-icon-share',
          path: '',
          isComplete: false
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-home',
          path: 'posts',
          isComplete: true
        },
        {
          name: '我的收藏',
          icon: 'layui-icon-star',
          path: 'collection',
          isComplete: true
        },
        {
          name: '其他资料',
          icon: 'layui-icon-template-1',
          path: '',
          isComplete: false
        },
        {
          name: '关注公众号',
          icon: 'layui-icon-login-wechat',
          path: '',
          isComplete: false
        },
        {
          name: '帮助',
          icon: 'layui-icon-list',
          path: '',
          isComplete: false
        },
        {
          name: '后台管理',
          icon: 'layui-icon-user',
          path: '',
          isComplete: false
        }
      ],
      userInfo: {}
    }
  },
  methods: {
    open(isComplete, path) {
      if (isComplete) {
        this.$router.push({ name: path })
      } else {
        this.$pop('(*￣︶￣)功能开发中，敬请期待')
      }
    }
  },
  mounted() {
    getInfo(this.$store.state.userInfo._id).then((res) => {
      console.log(res)
      if (res.code === 10000) {
        this.userInfo = res.data
        this.$store.commit('setUserInfo', res.data)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.ui-panel {
  margin-bottom: 0;
  box-shadow: none;
}
.user-center {
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;

  .info {
    display: flex;
    .account {
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      .my {
        line-height: 40px;
        border-bottom: 1px solid #f2f2f2;
      }
      .experience {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;

        p:first-child {
          margin-bottom: 10px;
          span {
            color: #e6941a;
          }
        }
        p:last-child {
          span {
            color: #FF5722;
          }
        }

        p {
          display: flex;
          align-items: center;
          span {
          font-size: 20px;
        }
        }
      }
    }

    & > div {
      flex: 1;
    }
  }

  .shortcut {
    flex: 1;
    margin-top: 10px;

    .quick {
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
    }

    .operate {
      ul {
        a:hover {
          color: #009688;
        }
        li {
          text-align: center;
          margin-bottom: 10px;
          div {
            line-height: 60px;
            background-color: #009688;

            i {
              color: #fff;
              font-size: 26px;
            }
          }
        }
      }
    }
  }
}
</style>
