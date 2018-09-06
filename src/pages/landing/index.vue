<template>
  <div>
  </div>
</template>

<script>
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
    methods: {
      redirect: function(e) {
        var url = ["/pages/login/main", "/pages/tickets/new/main", "/pages/tickets/list/main"]
        wx.reLaunch({
          url: url[e]
        })
      },
      checkUserType: function() {
        if (repairApi.data.info.type > 1) {
          this.redirect(2)
        } else {
          this.redirect(1)
        }
      }
    },
    onLoad() {
      var vm = this
      fyAccount.init()
      repairApi.init()
      if (vm.fyData.login) {
        vm.checkUserType()
      } else {
        wxAccount.login().then(r => {
          return repairApi.checkWxCode(r)
        }).then(r => {
          fyAccount.updateInfo(r)
          vm.checkUserType()
        }).catch(e => {
          vm.redirect(0)
        })
      }
    },
    async created() {}
  }
</script>

<style scoped>

</style>
