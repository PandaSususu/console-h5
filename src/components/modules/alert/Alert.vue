<template>
  <div v-show="isShow">
    <div class="alert-box" :class="{ active: isShow }">
      <div class="flex">{{ msg }}</div>
      <div v-if="type === 'alert'">
        <button @click="close()">确定</button>
      </div>
      <div v-else class="btns">
        <button @click="cancelEven()">取消</button>
        <button @click="confirmEvent()">确定</button>
      </div>
    </div>
    <div class="mask" @click="closeMask()"></div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'alert'
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Function,
      default: () => { console.log('你点击了确定按钮') }
    },
    cancel: {
      type: Function,
      default: () => { console.log('你点击了取消按钮') }
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
    closeMask() {
      if (this.type === 'alert') {
        this.close()
      }
    },
    confirmEvent() {
      this.confirm()
      this.close()
    },
    cancelEven() {
      this.cancel()
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
  $btn-main: #009688;
  $btn-dark: darken($btn-main, 5%);

  .alert-box {
    width: 300px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -75px;
    background-color: rgba(255, 255, 255);
    color: #333;
    padding: 20px 10px;
    font-size: 18px;
    text-align: center;
    z-index: 3000;

    &.active {
      animation: show .3s ease;
    }

    button {
      width: 80px;
      height: 36px;
      border: none;
      border-radius: 6px;
      background-color: #009688;
      color: #fff;

      &:hover {
        background-color: $btn-dark;
      }
    }

    .btns {
      display: flex;
      justify-content: space-around;
      width: 100%;
      & button:first-child {
        background-color: #ededed;
        color: #333;
      }
    }
  }

  .flex {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
