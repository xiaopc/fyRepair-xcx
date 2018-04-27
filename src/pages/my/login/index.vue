<template>
  <div>
    <view class="weui-cells__title"> </view>
    <loginform ref="form" @submit="loginFormSubmit" :loading="isLoading"/>
  </div>
</template>

<script>
import loginform from '@/components/loginform'
import fyAccount from '@/controller/fyaccount'
import repairApi from '@/controller/repairapi'

export default {
  data () {
    return {
      isLoading: false
    }
  },

  components: {
    loginform
  },

  methods: {
    loginFormSubmit (e) {
      var vm = this
      vm.$data.isLoading=true
      fyAccount.login(e).then(v => {
        vm.$data.isLoading=false
        if (v.code == 200){
          repairApi.connect(v.info).then(r => {
            fyAccount.updateInfo(r)
            wx.navigateBack(1)
          })
        } else {
            wx.showToast({
              title: '登录失败:'+v.info,
              icon: 'none',
              duration: 2000
            })
        }
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
</style>
