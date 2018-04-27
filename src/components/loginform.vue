<template>
  <div class="login-form">
    <form @submit="formSubmit">
      <view class="page__bd">
          <view class="weui-cells weui-cells_after-title">
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">用户名</view>
                  </view>
                  <view class="weui-cell__bd">
                      <input name="username" type="digit" class="weui-input" placeholder="用户名" />
                  </view>
              </view>
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">密码</view>
                  </view>
                  <view class="weui-cell__bd">
                      <input name="password" type="text" class="weui-input" password placeholder="密码" />
                  </view>
              </view>
          </view>
          <view class="weui-btn-area">
              <button class="weui-btn" type="primary" formType="submit" size="default" :loading="loading" :disabled="loading">登录</button>
          </view>
      </view>
    </form>
  </div>
</template>

<script>
export default {
  props: ['loading'],

  data() {
    return {loading: false}
  },

  methods: {
    formSubmit: function(e){
      this.$emit('submit', e.mp.detail.value)
    }
  }
}
</script>

<style>
</style>
