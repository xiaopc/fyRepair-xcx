<template>
  <div>
    <view class="weui-cells__title"> </view>
    <view class="weui-cells weui-cells_after-title">
        <navigator :url="(fyAccountData.login) ? 'info/main':'login/main'" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__bd">飞扬账号</view>
            <view class="weui-cell__ft weui-cell__ft_in-access" v-if="fyAccountData.login">{{fyAccountData.username}}</view>
            <view class="weui-cell__ft weui-cell__ft_in-access" v-else>未登录</view>
        </navigator>
        <navigator url="bind/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__bd">绑定微信</view>
            <view class="weui-cell__ft weui-cell__ft_in-access">
              {{repairData.settings.bindWx ? "已绑定" : "未绑定"}}
            </view>
        </navigator>
    </view>
    
    <view class="weui-cells__title"> </view>
    <view class="weui-cells weui-cells_after-title">
        <navigator url="about/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__bd">关于</view>
            <view class="weui-cell__ft weui-cell__ft_in-access"></view>
        </navigator>
    </view>
  </div>
</template>

<script>
import fyAccount from '@/controller/fyaccount'
import repairApi from '@/controller/repairapi'

export default {
  components: {
  },

  data () {
    return {
      fyAccountData: fyAccount.data,
      repairData: repairApi.data,
    }
  },

  methods: {
    
  },

  onLoad () {
    fyAccount.init()
    repairApi.init()
  }
}
</script>

<style>
</style>
