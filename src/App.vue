<template>
  <div id="app">
    <div>
      <vue-header></vue-header>
      <router-view></router-view>
    </div>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import header from './components/Header'
import footer from './components/Footer'
export default {
  name: 'app',
  components: {
    'vue-header': header,
    'vue-footer': footer
  }
}
</script>

<style lang="scss">
@import "./assets/css/global.css";

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#app >div:first-child {
  background-color: #f2f2f2;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.ui-panel {
  background-color: #fff;
  padding: 0 10px;
  margin-bottom: 10px;
  box-shadow: 5px 5px 5px #ddd;

  .title {
    padding: 10px 0;
    border-bottom: 1px solid #f2f2f2;
  }
}

.layui-word-aux {
  color: red !important ;
}

.face-leave-active {
  animation: bounceOut 0.3s;
}

.face-enter-to {
  animation: bounceIn 0.3s;
  animation-fill-mode: forwards;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}
</style>
