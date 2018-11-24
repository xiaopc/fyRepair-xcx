<template>
  <div>
    <view class="weui-cells weui-panel" v-if="ticketData!=null">
      <view class="weui-btn-area">
        <view class="cell-text" style="line-height:1;min-height:25px;" :class="statusColor[ticketData.basic.status]">{{status[ticketData.basic.status]}}</view>
        <view class="weui-label">{{ticketData.basic.time}}</view>
      </view>
      <view class="weui-btn-area">
        <view class="weui-label">单号</view>
        <view class="cell-text">{{ticketId}}</view>
      </view>
      <view class="weui-btn-area" v-if="!!ticketData.staff">
        <view class="weui-label">{{ (repairData.basic.staff_id > 0) ? "机主" : "技术员"}}</view>
        <view class="cell-text">
          {{ subject.name }} {{((repairData.basic.staff_id > 0) && (ticketData.basic.vip == 1)) ? "(会员)" : ""}}
        </view>
      </view>
      <view class="weui-btn-area inline" v-if="!!ticketData.staff">
        <view style="width:100%">
          <view class="weui-label">联系方式</view>
          <view class="cell-text">{{ subject.phone }}</view>
        </view>
        <view class="weui-btn-area inline-btn" style="height:23px;margin-top:3px;">
          <button @click="handlePhoneClick" class="weui-btn inline">复制</button>
        </view>
      </view>
      <view class="weui-btn-area">
        <view class="weui-label">设备</view>
        <view class="cell-text">{{ticketData.computer.brand}} {{ticketData.computer.model}}</view>
      </view>
      <view class="weui-btn-area">
        <view class="weui-label">购买日期</view>
        <view class="cell-text">{{ticketData.computer.buy_time}}</view>
      </view>
      <view class="weui-btn-area">
        <view class="weui-label">问题详情</view>
        <view class="cell-text" style="line-height:1.5;padding-top:22rpx;">{{ticketData.extend.description}}</view>
      </view>
    </view>
    <view v-if="ticketData!=null">
      <singlebtn text="取消报修" type="warn" v-if="repairData.basic.staff_id<0 && ticketData.basic.status<3" @submit="handleCancel" :disabled="ticketData.basic.status==2" />
      <singlebtn text="确认完成" type="primary" v-if="ticketData.basic.status>=3" @submit="handleFinish" :disabled="ticketData.basic.status==4" />
    </view>
    <appfooter />
    <view style="height:30px"></view>
  </div>
</template>

<script>
  import repairApi from '@/controller/repairapi'
  import singlebtn from '@/components/singlebtn'
  import appfooter from '@/components/appfooter'
  export default {
    components: {
      singlebtn, appfooter
    },
    data() {
      return {
        repairData: repairApi.data,
        ticketId: null,
        ticketData: null,
        status: ['待分配', '待确认', '已取消', '维修中', '已完成', '重新分配'], // 目前只存在 0 (2) 3 4
        statusColor: ['blue', 'blue', 'gray', 'blue', 'black', 'blue'],
      }
    },
    methods: {
      handlePhoneClick() {
        var vm = this
        wx.showActionSheet({
          itemList: ['复制号码', '呼叫'],
          success: function(res) {
            if (!res.cancel) {
              switch (res.tapIndex) {
                case 0:
                  wx.setClipboardData({
                    data: vm.subject.phone
                  })
                  break;
                case 1:
                  wx.makePhoneCall({
                    phoneNumber: vm.subject.phone
                  })
                  break;
              }
            }
          }
        })
      },
      handleAccept() {
        var vm = this
        repairApi.acceptTicket(vm.ticketId).then(v => {
          if (v.code == 200) {
            vm.refresh()
          } else {
            wx.showToast({
              title: '操作失败(' + v.code + ')',
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      handleCancel() {
        var vm = this
        wx.showModal({
          title: '取消维修单',
          content: '此操作不可逆',
          confirmText: '删除',
          confirmColor: '#EA3C16',
          success: function(res) {
            if (res.confirm) {
              repairApi.cancelTicket(vm.ticketId).then(v => {
                if (v.code == 200) {
                  vm.refresh()
                } else {
                  wx.showToast({
                    title: '操作失败(' + v.code + ')',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            }
          }
        })
      },
      handleFinish() {
        var vm = this
        repairApi.finishTicket(vm.ticketId).then(v => {
          if (v.code == 200) {
            vm.refresh()
          } else {
            wx.showToast({
              title: '操作失败(' + v.code + ')',
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      refresh() {
        var vm = this
        repairApi.getTicketDetail(vm.ticketId).then(v => {
          if (v.code == 200) {
            vm.$data.ticketData = v.data
            console.log(v)
          } else {
            wx.showToast({
              title: '获取详情失败(' + v.code +')',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    },
    computed: {
      subject: function(){
        if (this.repairData == null || this.ticketData == null) return {}
        return (this.repairData.basic.staff_id > 0) ? this.ticketData.user : this.ticketData.staff
      }
    },
    created() {
      repairApi.init()
    },
    onLoad(options) {
      this.ticketId = options["number"]
      this.refresh()
    },
    onHide() {
      this.ticketData = null
    }
  }
</script>

<style>
  .blue {
    color: #65b2e9;
  }
  .gray {
    color: #b2b2b2;
  }
</style>
