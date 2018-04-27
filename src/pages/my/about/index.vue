<template>
  <view class="page">
      <view class="weui-msg">
          <view class="weui-msg__text-area">
              <view class="weui-msg__title">飞扬维修</view>
              <view class="weui-msg__desc"></view>
          </view>
          <view class="weui-msg__opr-area">
              <view class="weui-btn-area">
                  <button class="weui-btn" type="default" @click="clearData">清除所有数据</button>
              </view>
          </view>
          <view class="weui-msg__extra-area">
              <view class="weui-footer">
                  <view class="weui-footer__text">© 2018 飞扬研发</view>
              </view>
          </view>
      </view>
  </view>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
    }
  },

  methods: {
    clearData () {
      wx.clearStorageSync()
      wx.showModal({
          content: '数据已清除，重启微信后生效。',
          showCancel: false,
      })
    }
  },

  created () {
  }
}
</script>

<style>
</style>
