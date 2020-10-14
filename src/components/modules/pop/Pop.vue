<template>
  <div v-show="isShow">
    <div class="pop">
      <p :class="{ 'zoom': type === 'zoom', 'shake': type === 'shake' }">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow(newVal, oldVal) {
      if (newVal !== oldVal && newVal) {
        setTimeout(() => {
          this.isShow = false
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .pop {
    position: fixed;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);

    p {
      padding: 10px 10px;
      background-color: rgba(0, 0, 0 , .4);
      border-radius: 10px;
      max-width: 200px;
      min-width: 100px;
      text-align: center;
      animation-duration: .2s;
      animation-timing-function: ease;
      animation-fill-mode: both;
      color: #fff;
    }

    .zoom {
      animation-name: zoom;
    }
    .shake {
      animation-name: shake;
    }
  }

  @keyframes zoom {
    0% {
      transform: scale(.5);
    } 100% {
      transform: scale(1);
    }
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0)
    } 10%, 30%, 50%, 60%, 70%, 90% {
      transform: translateX(-10px);
    } 20%, 40%, 60%, 80% {
      transform: translateX(10px);
    }
  }
</style>
