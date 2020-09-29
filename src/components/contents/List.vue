<template>
  <div class="ui-panel">
    <h3 class="title">置顶</h3>
    <ul>
      <li>
        <div class="pic"></div>
        <div class="info">
          <p class="news-title"><span>动态</span>基于layui的极简社区页面模板</p>
          <div class="tags">
            <span class="user">张三</span>
            <span class="created">2020-10-01</span>
            <span class="favs"
              ><svg t="1601371362583" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3938" width="200" height="200">
                <path
                  d="M780.97 144.725a40.96 40.96 0 0 1 34.836 19.415l146.09 236.202c9.654 15.608 7.748 35.73-4.664 49.249L543.536 900.15c-16.14 17.578-43.831 17.691-60.115 0.245L62.9 449.836c-12.65-13.553-14.62-33.913-4.802-49.639l147.456-236.202a40.96 40.96 0 0 1 34.746-19.27z m-22.828 81.92h-495.13l-118.78 190.273L513.12 812.155l362.782-395.111-117.76-190.399zM633.515 401.408c22.621 0 40.96 18.338 40.96 40.96s-18.339 40.96-40.96 40.96H382.293c-22.621 0-40.96-18.338-40.96-40.96s18.339-40.96 40.96-40.96h251.222z"
                  p-id="3939"
                  fill="#F76809"
                ></path></svg
              >60</span
            >
            <span class="end">已结</span>
          </div>
        </div>
        <p class="count"><span class="layui-icon layui-icon-dialogue"></span>66</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list'
}
</script>

<style lang="scss" scoped>
li {
  overflow: hidden;
  padding: 10px 0;
  height: 60px;
  .pic {
    width: 60px;
    height: 60px;
    background-color: #ddd;
    float: left;
    margin-right: 10px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 60px;
    .news-title {
      color: #333;
      font-size: 16px;
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

      span {
        margin-right: 10px;
      }

      .favs {
        color: #f76809;

        svg {
          width: 16px;
          height: 16px;
          vertical-align: middle;
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
    float: right;
  }
}
</style>
