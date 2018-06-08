<template>
  <div></div>
</template>

<script>
import wxAccount from '@/controller/wxaccount'
import fyAccount from '@/controller/fyaccount'
import repairApi from '@/controller/repairapi'

export default {
  data () {
    return {
      fyData: fyAccount.data,
      apiData: repairApi.data,
    }
  },

  methods:{
    redirect: function(e){
      wx.reLaunch({
        url: (e) ? "../tickets/new/main" : "../login/main"
      })
    }
  },

  onLoad () {
    var vm=this
    fyAccount.init()
    repairApi.init()
    if (vm.fyData.login) {
      vm.redirect(true)
    } else {
      wxAccount.login().then(r=>{
        return repairApi.checkWxCode(r)
      }).then(r=>{
        fyAccount.updateInfo(r)
        vm.redirect(true)
      }).catch(e=>{
        console.log(e)
        vm.redirect(false)
      })      
    }

  },

  async created () {
  }
}
</script>

<style scoped>
</style>
