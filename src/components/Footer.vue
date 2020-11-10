<template>
  <div class="footer">
    <ul class="links-t">
      <li>
        <a href="">关于我们</a>
      </li>
      <li>
        <a href="">招纳贤士</a>
      </li>
      <li>
        <a href="">广告服务</a>
      </li>
      <li>
        <a href="">开发助手</a>
      </li>
    </ul>
    <ul class="links-b">
      <li>
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030143">公安备案号11010502030143</a>
      </li>
      <li>
        <a href="http://beian.miit.gov.cn/publish/query/indexFirst.action">京ICP备19004658号</a>
      </li>
      <li>
        <a href="https://csdnimg.cn/release/live_fe/culture_license.png">京网文〔2020〕1039-165号</a>
      </li>
      <li>
        <a href="https://csdnimg.cn/cdn/content-toolbar/csdn-ICP.png">经营性网站备案信息</a>
      </li>
      <li>
        <a href="http://www.bjjubao.org/">北京互联网违法和不良信息举报中心</a>
      </li>
      <li>
        <a href="http://www.cyberpolice.cn/">网络110报警服务</a>
      </li>
      <li>
        <a href="http://www.12377.cn/">中国互联网举报中心</a>
      </li>
      <li>
        <a href="https://download.csdn.net/index.php/tutelage/">家长监护</a>
      </li>
      <li>
        <a href="https://chrome.google.com/webstore/detail/csdn/ojklpkibpnnjefjcmlkbjcmpmgfcaiao?hl=zh-CN">Chrome商店下载</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'bottom-footer',
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
  .footer {
    padding: 20px 10px;
  }
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    li {
      margin: 0 6px;
      a {
        color: #999aaa;
        &:hover {
          text-decoration: underline;
          color: #333;
        }
      }
    }
  }

  .links-t {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .links-b {
    font-size: 12px;
  }
</style>
