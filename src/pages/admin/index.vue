<template>
  <div style="overflow:hidden">
    <view class="weui-cells weui-panel">
        coming soon...
    </view>
    <view style="height:10px"></view>
  </div>
</template>

<script>
  import singlebtn from '@/components/singlebtn'
  import inputbox from '@/components/form/inputbox'
  import textareabox from '@/components/form/textareabox'
  import userbox from '@/components/userbox'
  import wxAccount from '@/controller/wxaccount'
  import fyAccount from '@/controller/fyaccount'
  import repairApi from '@/controller/repairapi'

  export default {
    data() {
      return {
        fyData: fyAccount.data,
        apiData: repairApi.data,
      }
    },
    components: {
      singlebtn,
      inputbox,
      textareabox,
    },
    methods: {
    },
    computed: {
    },
    onLoad() {
    },
    onShow() {
    },
    async created() {
    }
  }
</script>

<style scoped>
  .inline {
    display: flex;
    margin: -.6em 0 -.6em 0;
  }
  .inline-btn {
    width: 30%;
  }
  .radio {
    display: inline-block;
    font-size: 40rpx;
    width: 100%;
  }
  .radio-group {
    padding: 10rpx 0;
    line-height: 2.5;
  }
</style>
