<template>
  <div>
    <image class="banner" src="/static/images/index_banner.png" mode="aspectFit" />
    <loginform ref="form" @submit="loginFormSubmit" @getotp="otpSubmit" 
               :submitLoading="isSubmitLoading" :otpCountdown="otpCountdown" :otpLoading="otpLoading"/>
  </div>
</template>

<script>
import loginform from '@/components/loginform'
import fyAccount from '@/controller/fyaccount'
import repairApi from '@/controller/repairapi'

export default {
  data () {
    return {
      isSubmitLoading: false,
      otpCountdown: 0,
      otpLoading: false,
      backurl: ""
    }
  },

  components: {
    loginform
  },

  methods: {
    loginFormSubmit (e) {
      var vm = this
      vm.$data.isSubmitLoading=true
      fyAccount.login(e).then(v => {
        vm.$data.isSubmitLoading=false
        if (v.code == 200){
          repairApi.connect(v.info).then(r => {
            fyAccount.updateInfo(r)
            wx.reLaunch({
              url: "../tickets/new/main"
            })
          })
        } else {
            wx.showToast({
              title: '登录失败:'+v.info,
              icon: 'none',
              duration: 2000
            })
        }
      })
    },
    otpSubmit (e){
      var vm = this
      vm.$data.otpLoading=true
      repairApi.getotp({cellnum: e}).then(v => {
        vm.$data.otpLoading=false

        var smstimeout = 150;
        var smsinterval = null;
        var checksms = function (){
            if (--smstimeout === 0) {
                clearInterval(smsinterval);
                vm.otpCountdown = 0
                return;
            }
            vm.otpCountdown = smstimeout
        }
        smsinterval = setInterval(checksms, 1000)

      }).catch(e=>{
        vm.$data.otpLoading=false
        wx.showToast({
          title: '获取验证码失败',
          icon: 'none',
          duration: 2000
        })
      })
    }
  },

  onLoad () {
    fyAccount.init()
    repairApi.init()
  }

}
</script>

<style>
.banner{
  width:100%;
  height:150px;
}
</style>
