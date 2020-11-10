<template>
  <div class="flex">
    <div class="success" v-if="isSuccess">
      <svg t="1604505314980" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7890" width="200" height="200"><path d="M512 0C229.668571 0 0 229.668571 0 512s229.668571 512 512 512 512-229.668571 512-512S794.331429 0 512 0z m307.2 343.771429s-267.702857 295.497143-327.68 365.714285c-59.977143 70.217143-106.788571 0-106.788571 0L210.651429 529.554286s-27.794286-42.422857 21.942857-81.92c46.811429-38.034286 84.845714 0 84.845714 0l122.88 128.731428L746.057143 291.108571s29.257143-20.48 59.977143 5.851429c23.405714 21.942857 13.165714 46.811429 13.165714 46.811429z" fill="#68BF7B" p-id="7891"></path></svg>
      <p>修改成功，<span>{{ countDownTime }}</span>秒后自动返回首页</p>
    </div>
    <p v-else>亲爱的{{ queryObj.name }}攻城狮，你将要重置你的邮箱账户为<span>{{ queryObj.newEmail }}</span></p>
    <div>
      <router-link :to="{ name: 'index' }" tag="button" class="layui-btn layui-btn-normal">返回首页</router-link>
     <button class="layui-btn" @click="submit()" :class="{ 'layui-btn-disabled': isSuccess }">确认修改</button>
    </div>
  </div>
</template>

<script>
import { updateEmail } from '@/api/user'

export default {
  name: 'confirm',
  data() {
    return {
      queryObj: {},
      isSuccess: false,
      countDownTime: 3
    }
  },
  methods: {
    submit() {
      updateEmail(this.queryObj).then((res) => {
        if (res.code === 10000) {
          this.isSuccess = true
          this.$store.state.userInfo.email = res.data.email
          localStorage.setItem('userInfo', JSON.stringify(this.$store.state.userInfo))
          const countDown = setInterval(() => {
            this.countDownTime--
            if (this.countDownTime === 0) {
              clearInterval(countDown)
              this.$router.push({ name: 'index' })
            }
          }, 1000)
        } else {
          this.$alert(res.message)
        }
      })
    }
  },
  mounted() {
    const queryStr = window.location.href.replace(/.*\?/, '')
    this.queryObj = Object.fromEntries(queryStr.split('&').map(parms => parms.split('=')))
    this.queryObj.newEmail = decodeURIComponent(this.queryObj.newEmail)
    this.queryObj.name = decodeURIComponent(this.queryObj.name)
  }
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  p {
    font-size: 16px;
    margin-bottom: 20px;
    span {
       color: #009688;
     }
  }

  .success {
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
      width: 150px;
      height: 150px;
      margin-bottom: 10px;
    }
  }
}
</style>
