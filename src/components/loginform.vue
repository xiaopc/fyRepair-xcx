<template>
  <div class="login-form">
    <form @submit="formSubmit">
      <view class="page__bd">
        <view class="weui-cells weui-panel" :class="{active: isPanelFocus}">
          <inputbox @focus="oFocus" @blur="oBlur" @input="cellInput" label="手机号" name="username" type="digit" maxlength="11" />
          <view class="inline">
            <view style="width:100%">
              <inputbox @focus="oFocus" @blur="oBlur" label="验证码" name="otpcode" type="digit" maxlength="6" />
            </view>
            <view class="weui-btn-area inline-btn">
              <button @click="getOtp" class="weui-btn inline" :loading="otploading" :disabled="otpLoading || otpCountdown != 0">{{otpBtnText}}</button>
            </view>
          </view>
        </view>
        <view class="weui-btn-area">
          <button class="weui-btn" type="primary" formType="submit" size="default" :loading="submitLoading" :disabled="submitLoading">登录</button>
        </view>
      </view>
    </form>
  </div>
</template>

<script>
  import inputbox from '@/components/form/inputbox'
  export default {
    props: ['submitLoading', 'otpLoading', 'otpCountdown'],
    components: {
      inputbox
    },
    data() {
      return {
        isPanelFocus: false,
        submitLoading: false,
        cell: "",
        otpLoading: false,
        otpCountdown: 0,
      }
    },
    methods: {
      oFocus: function() {
        this.isPanelFocus = true
        this.$emit('focus')
      },
      oBlur: function() {
        this.isPanelFocus = false
        this.$emit('blur')
      },
      cellInput: function(e) {
        this.cell = e
      },
      getOtp: function() {
        this.$emit('getotp', this.cell)
      },
      formSubmit: function(e) {
        this.$emit('submit', e.mp.detail.value)
      }
    },
    computed: {
      otpBtnText: function() {
        return this.otpCountdown == 0 ? "获取" : this.otpCountdown + "秒"
      }
    },
  }
</script>

<style>
  .inline {
    display: flex;
  }
</style>
