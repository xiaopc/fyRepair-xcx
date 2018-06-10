<template>
  <view class="weui-btn-area">
    <navigator :url="url" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
      <view class="weui-cell__bd weui-cell-label">{{text}}</view>
      <view class="weui-cell-arrow"></view>
    </navigator>
  </view>
</template>

<script>
  export default {
    props: ['text', 'url'],
    data() {
      return {
        text: null,
        url: null,
      }
    },
    methods: {
      oFocus: function(e) {
        this.$emit('focus')
      },
    }
  }
</script>

<style>
  .weui-cell_access {
    background: #fafafa;
    border: 1px solid rgba(5, 5, 5, 0.3);
    border-radius: 12rpx;
    padding: 10px 20px;
  }
  .weui-cell-label {
    color: #777;
    font-size: 16px;
  }
  .weui-cell-arrow {
    display: block;
    height: 30rpx;
    width: 20rpx;
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiID8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjE3IiBoZWlnaHQ9IjI4Ij4KCTxkZWZzPgoJCTxjbGlwUGF0aCBpZD0iY2xpcF8wIj4KCQkJPHJlY3QgeD0iLTY3MC4zNjUyMyIgeT0iLTU1Mi45MjU3OCIgd2lkdGg9Ijc1MC42NDY0MiIgaGVpZ2h0PSIxNjIzLjA3MzIiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcF8wKSI+CgkJPHBhdGggZmlsbD0icmdiKDE5MiwxOTIsMTkyKSIgc3Ryb2tlPSJub25lIiB0cmFuc2Zvcm09Im1hdHJpeCgtMC45OTgyIDAgMCAwLjk5ODIgMTYuNDI1OCAwLjA3ODEyNSkiIGQ9Ik0xMy42MDA0IDI3Ljk2NUwwLjAzNDUzNiAxNC4zOTkxQy0wLjAxMTAwOCAxNC4xNTExIC0wLjAxMjAxMzMgMTMuODUxMiAwLjAzNDUzNiAxMy42MDExTDEzLjYwMDQgMC4wMzUyNzFDMTMuNzA1MSAtMC4wMTAzMzEzIDE0LjAwMDEgLTAuMDEzMTYxNCAxNC4zOTg0IDAuMDM1MjcxTDE1Ljk5NDQgMS42MzEyNkMxNi4wMzk4IDIuMDQ4MDMgMTYuMDQyIDIuMzQ4NjUgMTUuOTk0NCAyLjQyOTI1TDQuODIyNDkgMTMuNjAxMUM0LjY2MjI0IDEzLjg0ODIgNC42NTkwNSAxNC4xNDk5IDQuODIyNDkgMTQuMzk5MUwxNS45OTQ0IDI1LjU3MUMxNi4wMzg4IDI1LjY0OTQgMTYuMDQzNiAyNS45NDk1IDE1Ljk5NDQgMjYuMzY5TDE0LjM5ODQgMjcuOTY1QzE0LjAwMzggMjguMDEwNyAxMy43MDYxIDI4LjAxMjYgMTMuNjAwNCAyNy45NjVaIi8+Cgk8L2c+Cjwvc3ZnPgo=);
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
