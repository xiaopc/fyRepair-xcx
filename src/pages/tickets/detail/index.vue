<template>
  <div>
    <view class="weui-cells__title"> </view>
    <view class="weui-cells weui-cells_after-title" v-if="ticketData!=null">
        <view class="weui-cell weui-cell_access">
            <view class="weui-cell__bd">机主</view>
            <view class="weui-cell__ft">{{ticketData.name}} {{(ticketData.vip==1)?"(会员)":""}}</view>
        </view>
        <view class="weui-cell weui-cell_access" @click="handlePhoneClick">
            <view class="weui-cell__bd">联系方式</view>
            <view class="weui-cell__ft weui-cell__ft_in-access">{{ticketData.phone}}</view>
        </view>
        <view class="weui-cell weui-cell_access">
            <view class="weui-cell__bd">设备型号</view>
            <view class="weui-cell__ft">{{ticketData.computer.brand}} {{ticketData.computer.model}}</view>
        </view>
        <view class="weui-cell weui-cell_access">
            <view class="weui-cell__bd">购买日期</view>
            <view class="weui-cell__ft">{{ticketData.computer.buy_time}}</view>
        </view>
        <view class="weui-cell weui-cell_access">
            <view class="weui-cell__bd">报修时间</view>
            <view class="weui-cell__ft">{{ticketData.time}}</view>
        </view>
        <view class="weui-cell weui-cell_access" v-if="ticketData.distribute_time!=0">
            <view class="weui-cell__bd">分单时间</view>
            <view class="weui-cell__ft">{{ticketData.distribute_time}}</view>
        </view>
        <view class="weui-cell weui-cell_access" v-if="ticketData.staff_confirm_time!=0">
            <view class="weui-cell__bd">确认时间</view>
            <view class="weui-cell__ft">{{ticketData.staff_confirm_time}}</view>
        </view>
        <view class="weui-cell weui-cell_access" v-if="ticketData.user_confirm_time!=0">
            <view class="weui-cell__bd">完成时间</view>
            <view class="weui-cell__ft">{{ticketData.user_confirm_time}}</view>
        </view>
    </view>
    <view class="weui-panel" v-if="ticketData!=null">
      <view class="weui-panel__bd">
          <view class="weui-media-box weui-media-box_text">
              <view class="weui-media-box__title weui-media-box__title_in-text">问题详情</view>
              <view class="weui-media-box__desc">{{ticketData.description}}</view>
          </view>
      </view>
    </view>

  </div>
</template>

<script>
import repairApi from '@/controller/repairapi'

export default {
  components: {
  },

  data () {
    return {
      repairData: repairApi.data,
      ticketData: null
    }
  },

  methods: {
    handlePhoneClick () {
      var vm = this
      wx.showActionSheet({
          itemList: ['复制号码', '呼叫'],
          success: function(res) {
              if (!res.cancel) {
                  switch (res.tapIndex){
                    case 0:
                      wx.setClipboardData({data:vm.ticketData.phone})
                      break;
                    case 1:
                      wx.makePhoneCall({phoneNumber:vm.ticketData.phone})
                      break;
                  }
              }
          }
      })
    }
  },

  created () {
    repairApi.init()
  },

  onLoad (options) {
    var vm = this
    repairApi.getTicketDetail(options["number"]).then(v => {
      if (v.code == 200){
        vm.$data.ticketData = v.data
        console.log(v)
      } else {
          wx.showToast({
            title: '获取详情失败',
            icon: 'none',
            duration: 2000
          })
      }
    })
  },

  onHide () {
      this.ticketData = null
  }
}
</script>

<style>
</style>
