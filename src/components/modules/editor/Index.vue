<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect layui-form-label edit">
          <span @click="choose('face')">
            <i class="layui-icon layui-icon-face-smile-fine"></i>
          </span>
          <span @click="choose('image')">
            <i class="layui-icon layui-icon-picture-fine"></i>
          </span>
          <span @click="choose('link')">
            <i class="layui-icon layui-icon-link"></i>
          </span>
          <span @click="choose('quote')">
            ”
          </span>
          <span @click="choose('code')">
            <i class="layui-icon layui-icon-fonts-code"></i>
          </span>
          <span @click="lineBreak()">
            hr
          </span>
          <span>
            <i class="layui-icon layui-icon-chart-screen"></i>
          </span>
        </div>
        <textarea name="conetent" v-model="content" ref="edit" class="layui-textarea" @focus="focusEvent()" @blur="blurEvent()"></textarea>
      </div>
    </div>
    <ui-face :isShow="currentShow === 'face'" @addEvent="handleFace" @closeEvent="close()"></ui-face>
    <ui-image :isShow="currentShow === 'image'" @addEvent="handleImage" @closeEvent="close()"></ui-image>
    <ui-link :isShow="currentShow === 'link'" @addEvent="handleLink" @closeEvent="close()"></ui-link>
    <ui-quote :isShow="currentShow === 'quote'" @addEvent="handleQuote" @closeEvent="close()"></ui-quote>
    <ui-code :isShow="currentShow === 'code'" @addEvent="handleCode" @closeEvent="close()"></ui-code>
  </div>
</template>

<script>
import Face from './Face'
import Image from './Image'
import Link from './Link'
import Quote from './Quote'
import Code from './Code'

export default {
  name: 'editor',
  data() {
    return {
      content: '',
      cursor: 0,
      currentShow: ''
    }
  },
  components: {
    'ui-face': Face,
    'ui-image': Image,
    'ui-link': Link,
    'ui-quote': Quote,
    'ui-code': Code
  },
  methods: {
    handleFace(face) {
      const text = `表情${face} `
      this.insert(text)
    },
    handleImage(url) {
      this.insert(url)
    },
    handleLink(link) {
      this.insert(link)
    },
    handleQuote(content) {
      this.insert(content)
    },
    handleCode(code) {
      this.insert(code)
    },
    lineBreak() {
      this.currentShow = 'hr'
      if (this.cursor === 0) {
        this.insert('[hr]\n')
      } else {
        this.insert('\n[hr]')
      }
    },
    choose(current) {
      this.currentShow = current
    },
    close() {
      this.currentShow = ''
    },
    insert(val) {
      const tmp = this.content.split('')
      tmp.splice(this.cursor, 0, val)
      this.content = tmp.join('')
      this.cursor += val.length
      this.close()
    },
    focusEvent() {
      this.getCursor()
    },
    blurEvent() {
      this.getCursor()
    },
    getCursor() {
      const element = this.$refs.edit
      this.cursor = element.selectionStart
      console.log(this.cursor)
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-wrap {
  position: relative;
}

.edit {
  color: #009688;
  display: flex;

  span {
    display: inline-block;
    width: 40px;
    display: flex;
    justify-content: center;
  }
}

.layui-textarea {
  height: 260px;
  margin-bottom: 15px;
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
