<template>
  <div>
    <view class="page__bd">
        <view class="weui-article">
              <view class="weui-article__p">
                  绑定飞扬账号与微信账号，享受微信通知等功能。
              </view>
        </view>
    </view>
    <view class="page__bd">
        <singlebtn text="暂未开放" :disabled="true" />
    </view>
  </div>
</template>

<script>
import singlebtn from '@/components/singlebtn'
import fyAccount from '@/controller/fyaccount'
import wxAccount from '@/controller/wxaccount'

export default {
  data () {
    return {
      isLoading: false
    }
  },

  components: {
    singlebtn
  },

  methods: {
    async loginFormSubmit (e) {
      this.$data.isLoading=true
      fyAccount.login(e).then(v => {
        this.$data.isLoading=false
        if (v.code == 200){
          wx.navigateBack(1)
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

  created () {
  },

  onLoad () {
    wxAccount.login()
  }

}
</script>

<style>
</style>
