<template>
  <div>
    <userbox :disabled="true" :usertype="(apiData.basic.staff_id > 0) ? 2 : 0" functype="1" :indata="fyData.info" :text="staffText" />
    <singlebtn @submit="admin()" text="管理控制台" size="default" type="primary" v-if="isAdmin"/>
    <view class="weui-cells weui-panel" v-for="(ticket, index) in tickets" @click="jumpToDetail(index)">
      <view class="weui-btn-area">
        <view class="cell-text" style="line-height:1;min-height:25px;" :class="statusColor[ticket.status]">{{status[ticket.status]}}</view>
        <view class="weui-label" style="color:#e0e0e0;">{{ticket.time}}</view>
      </view>
      <view class="weui-btn-area" v-if="!!ticket.name">
        <view class="weui-label">{{ (apiData.basic.staff_id > 0) ? "机主" : "技术员"}}</view>
        <view class="cell-text">{{ticket.name}} {{ticket.phone}}</view>
      </view>
      <view class="weui-btn-area">
        <view class="weui-label">设备</view>
        <view class="cell-text">{{ticket.computer.brand}} {{ticket.computer.model}}</view>
      </view>
    </view>
    <appfooter />
    <view style="height:30px"></view>
  </div>
</template>

<script>
  import fyAccount from '@/controller/fyaccount'
  import repairApi from '@/controller/repairapi'
  import singlebtn from '@/components/singlebtn'
  import userbox from '@/components/userbox'
  import appfooter from '@/components/appfooter'
  export default {
    data() {
      return {
        fyData: fyAccount.data,
        apiData: repairApi.data,
        tickets: [],
        status: ['等待分配', '等待确认', '已取消', '正在维修', '已完成', '重新分配'],
        statusColor: ['blue', 'blue', 'gray', 'blue', 'black', 'blue'],
        lastUpdate: null
      }
    },
    components: {
      userbox, appfooter, singlebtn
    },
    methods: {
      login() {
        wx.reLaunch({
          url: "/pages/login/main"
        })
      },
      admin() {
        wx.navigateTo({
          url: "/pages/admin/main"
        })
      },
      jumpToDetail(index) {
        wx.navigateTo({
          url: "../detail/main?number=" + this.tickets[index].number
        })
      },
    },
    computed: {
      staffText: function() {
        var counter = [0, 0, 0, 0, 0, 0]
        for (var ticket in this.tickets) {
          counter[this.tickets[ticket].status]++
        }
        return counter[3] + " " + this.status[3] + " " + counter[4] + " " + this.status[4]
      },
      isAdmin: function() {
        return this.fyData.info.permissions.includes('10')
      }
    },
    onLoad() {
      fyAccount.init()
      repairApi.init()
    },
    onPullDownRefresh() {
      var vm = this
      vm.lastUpdate = new Date()
      repairApi.getTickets().then(e => {
        if (e.code == 200) {
          vm.tickets = e.data
        } else if (e.code == 401) {
          fyAccount.logout()
          repairApi.logout()
          wx.showModal({
            content: '登录已失效，请重新登录',
            showCancel: false,
            success: function(res) {
              vm.login()
            }
          })
        }
        wx.stopPullDownRefresh()
      })
    },
    onShow() {
      if ((this.lastUpdate == null || this.lastUpdate.getTime() - (new Date()).getTime() > 60000) && this.fyData.login) {
        wx.startPullDownRefresh()
      }
    }
  }
</script>

<style>
  .ticket {
    margin: 10px 0;
  }
  .blue {
    color: #65b2e9;
  }
  .gray {
    color: #b2b2b2;
  }
</style>
