<script>
import config from '@/config/config'

export default {
  created () {
  },
  onLaunch () {
    var res = wx.getSystemInfoSync()
    wx.reportAnalytics('cold_start', {
        version: config.version,
        wx_version: res.version,
        sys_version: res.system,
        client: res.brand +  "-" + res.model,
    })
  }
}
</script>

<style lang="less">
@import 'styles/weui.css';
page {
  background: #fafafa;
  overflow-x: hidden;
  margin: 0;
  outline: 0 none;
  padding: 0;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
