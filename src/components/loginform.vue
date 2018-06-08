<template>
  <div class="login-form">
    <form @submit="formSubmit">
      <view class="page__bd">
          <view class="weui-cells weui-cells_after-title">
            <inputbox @input="cellInput" label="手机号" name="username" type="digit" maxlength="11"/>
            <view class="inline">
              <inputbox label="验证码" name="otpcode" type="digit" maxlength="6"/>
              <view class="weui-btn-area inline-btn">
                <button @click="getOtp" class="weui-btn" :loading="otploading" :disabled="otpLoading || otpCountdown != 0">{{otpBtnText}}</button>
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
  components: {inputbox},
  data() {
    return {
      submitLoading: false,
      cell: "",
      otpLoading: false,
      otpCountdown: 0,
    }
  },

  methods: {
    cellInput: function(e) {
      this.cell = e
    },
    getOtp: function(){
      this.$emit('getotp', this.cell)
    },
    formSubmit: function(e){
      this.$emit('submit', e.mp.detail.value)
    }
  },

  computed:{
    otpBtnText: function() {
      return this.otpCountdown == 0 ? "获取" : this.otpCountdown +"秒"
    }
  },
}
</script>

<style>
.inline{
  display:flex;
  margin:-.6em 0 -.6em 0;
}
.inline-btn{
  width:30%;
}
</style>
