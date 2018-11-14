<template>
  <div>
    <view :class="{hide: editing}">
      <view class="weui-cells weui-panel" style="height:200px;"></view>
      <image class="banner" src="/static/images/index_banner.png" mode="aspectFit" />
    </view>
    <loginform ref="form" @submit="loginFormSubmit" @getotp="otpSubmit" @focus="oFocus" @blur="oBlur"
               :submitLoading="isSubmitLoading" :otpCountdown="otpCountdown" :otpLoading="otpLoading"/>
    <appfooter />
  </div>
</template>

<script>
import loginform from '@/components/loginform'
import appfooter from '@/components/appfooter'
import fyAccount from '@/controller/fyaccount'
import repairApi from '@/controller/repairapi'
import wxAccount from '@/controller/wxaccount'

export default {
  data () {
    return {
      fyData: fyAccount.data,
      apiData: repairApi.data,
      editing: false,
      isSubmitLoading: false,
      otpCountdown: 0,
      otpLoading: false,
      backurl: ""
    }
  },

  components: {
    loginform, appfooter
  },

  methods: {
    redirect: function(e) {
      wx.hideLoading()
      var url = ["/pages/login/main", "/pages/tickets/new/main", "/pages/tickets/list/main"]
      wx.reLaunch({
        url: url[e]
      })
    },
    checkUserType: function() {
      if (repairApi.data.basic.staff_id > 0) {
        this.redirect(2)
      } else {
        this.redirect(1)
      }
    },
    // above are methods from landing page
    oFocus: function(e){
      this.editing = true
    },
    oBlur: function(e){
      this.editing = false
    },
    loginFormSubmit (e) {
      var vm = this
      vm.$data.isSubmitLoading=true
      fyAccount.login(e).then(v => {
        vm.$data.isSubmitLoading=false
        if (v.code == 200){
          repairApi.connect(v.info).then(r => {
            fyAccount.updateInfo(r)
            vm.checkUserType()
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
        console.log(e)
        wx.showToast({
          title: '获取失败('+ e +')',
          icon: 'none',
          duration: 2000
        })
      })
    }
  },

  onLoad() {
    var vm = this
    fyAccount.init()
    repairApi.init()
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    wxAccount.login().then(r => {
      return repairApi.checkWxCode(r)
    }).then(r => {
      wx.hideLoading()
      fyAccount.updateInfo(r)
      vm.checkUserType()
    }).catch(e => {
      wx.hideLoading()
    })
  },

}
</script>

<style>
.banner{
  width:100%;
  position:absolute;
  top:25px;
}
</style>
