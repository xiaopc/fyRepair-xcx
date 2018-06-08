<template>
  <div style="overflow:hidden">
    <singlenav text="查看历史记录及更多" url="../list/main"/>
    <textareabox @focus="textareaFocus" @blur="textareaBlur" @input="textareaInput" label="快速报修" name="username" placeholder="简单描述你遇到的问题..."/>
    <view class="detail-area" v-show="started">

    </view>

    <view class="fix-bottom">
      <singlebtn text="立即报修" size="default" type="primary"/>
    </view>
  </div>
</template>

<script>
import singlebtn from '@/components/singlebtn'
import inputbox from '@/components/form/inputbox'
import textareabox from '@/components/form/textareabox'
import singlenav from '@/components/form/singlenav'
import wxAccount from '@/controller/wxaccount'
import fyAccount from '@/controller/fyaccount'
import repairApi from '@/controller/repairapi'

export default {
  data () {
    return {
      fyData: fyAccount.data,
      apiData: repairApi.data,
      writing: false,
      textval: null,
      devices: null,
    }
  },

  components: {
    singlebtn,
    inputbox,
    textareabox,
    singlenav
  },

  methods: {
    textareaFocus: function (e) {
      this.writing = true
    },
    textareaBlur: function (e) {
      this.writing = false
    },
    textareaInput: function (e) {
      this.textval = e
    }
  },

  computed:{
    otpBtnText: function() {
      return this.otpcountdown == 0 ? "获取" : this.otpcountdown +"秒"
    }
  },

  onLoad () {
    fyAccount.init()
    repairApi.init()
    repairApi.getDevices().then(r=>{
      console.log(r)
    }).catch(e=>{
      wx.showToast({
        title: '获取设备信息失败',
        icon: 'none',
        duration: 2000
      })
    })
  },

  async created () {
  }
}
</script>

<style scoped>
.inline{
  display:flex;
  margin:-.6em 0 -.6em 0;
}
.inline-btn{
  width:30%;
}
.fix-bottom{
  position: absolute;
  bottom:0;
  background: #fafafa;
  width:100%;
  border-top:1px solid #bbb;
}
</style>
