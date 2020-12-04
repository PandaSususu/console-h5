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
          <span @click="choose('preview')">
            <i class="layui-icon layui-icon-chart-screen"></i>
          </span>
        </div>
        <textarea name="conetent" v-model="content" id="edit" ref="edit" class="layui-textarea" @focus="focusEvent()" @blur="blurEvent()"></textarea>
      </div>
    </div>
    <ui-face :isShow="currentShow === 'face'" @addEvent="handleFace" @closeEvent="close()"></ui-face>
    <ui-image :isShow="currentShow === 'image'" @addEvent="handleImage" @closeEvent="close()"></ui-image>
    <ui-link :isShow="currentShow === 'link'" @addEvent="handleLink" @closeEvent="close()"></ui-link>
    <ui-quote :isShow="currentShow === 'quote'" @addEvent="handleQuote" @closeEvent="close()"></ui-quote>
    <ui-code :isShow="currentShow === 'code'" @addEvent="handleCode" @closeEvent="close()"></ui-code>
    <ui-preview :isShow="currentShow === 'preview'" :content="content" @closeEvent="close()"></ui-preview>
  </div>
</template>

<script>
import Face from './Face'
import Image from './Image'
import Link from './Link'
import Quote from './Quote'
import Code from './Code'
import Preview from './Preview'

export default {
  name: 'editor',
  props: ['initContent'],
  data() {
    return {
      content: '',
      cursor: 0,
      currentShow: ''
    }
  },
  watch: {
    initContent(newVal, oldVal) {
      if (this.content !== newVal) {
        this.content = newVal
      }
    }
  },
  components: {
    'ui-face': Face,
    'ui-image': Image,
    'ui-link': Link,
    'ui-quote': Quote,
    'ui-code': Code,
    'ui-preview': Preview
  },
  updated() {
    this.$emit('changeContent', this.content)
  },
  methods: {
    handleFace(face) {
      this.insert(`表情${face} `)
    },
    handleImage(url) {
      this.insert(`图片[${url}] `)
    },
    handleLink(linkObj) {
      this.insert(`链接(${linkObj.link})[${linkObj.linkName ? linkObj.linkName : linkObj.link}] `)
    },
    handleQuote(content) {
      this.insert(`\n[引用]\n${content}\n[/引用]\n`)
    },
    handleCode(code) {
      this.insert(`\n[代码]\n${code}\n[/代码]\n`)
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
      if (this.currentShow === current) {
        this.currentShow = ''
        return
      }
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
