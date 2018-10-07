<template>
  <div class="footer">
    <view style="text-align: center; color: #8c8c8c; font-size: 1em;">
        <view class="bottomBlock">版本 {{ version }}</view> |
        <navigator class="bottomBlock" target="miniProgram" open-type="navigate" app-id="wx8abaf00ee8c3202e" :extra-data=extraData version="release">反馈&nbsp;&nbsp;打赏</navigator>
    </view>
  </div>
</template>

<script>
  import config from '@/config/config'

  export default {
    props: [],
    data() {
      return {
        version: config.version,
        extraData: {
          id: config.tucao.id,
          customData: {
            clientVersion: config.version,
          } 
        }
      }
    },
    onLoad() {
      var res = wx.getSystemInfoSync()
      this.extraData.customData.clientInfo = res.brand +  "-" + res.model
      this.extraData.customData.osVersion = res.system
    },
    methods: {
    }
  }
</script>

<style>
.bottomBlock {
  display: inline-block;
  padding: 0.2rem 0.35rem;
}
</style>
