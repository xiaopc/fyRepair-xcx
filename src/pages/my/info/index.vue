<template>
  <div>
    <view class="weui-cells__title"> </view>
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_access">
        <view class="weui-cell__bd">用户名</view>
        <view class="weui-cell__ft" v-if="data.login">{{data.username}}</view>
      </view>
      <view class="weui-cell weui-cell_access">
        <view class="weui-cell__bd">姓名</view>
        <view class="weui-cell__ft" v-if="data.login">{{data.info.name}}</view>
      </view>
      <view class="weui-cell weui-cell_access">
        <view class="weui-cell__bd">手机</view>
        <view class="weui-cell__ft" v-if="data.login">{{data.info.cell}}</view>
      </view>
      <view class="weui-cell weui-cell_access">
        <view class="weui-cell__bd">邮箱</view>
        <view class="weui-cell__ft" v-if="data.login">{{data.info.email}}</view>
      </view>
    </view>
  </div>
</template>

<script>
  import fyAccount from '@/controller/fyaccount'
  export default {
    components: {},
    data() {
      return {
        data: fyAccount.data,
        typeData: ['普通用户', '会员用户', '技术员', '管理员']
      }
    },
    methods: {},
    onLoad() {
      fyAccount.init()
    }
  }
</script>

<style>

</style>
