<template>
  <div>
    <view class="page" v-if="fyData.login==false">
        <view class="weui-msg">
            <view class="weui-msg__icon-area">
                <icon type="info" size="93"></icon>
            </view>
            <view class="weui-msg__text-area">
                <view class="weui-msg__title">请登录</view>
                <view class="weui-msg__desc">登录后即可查看、管理维修单</view>
            </view>
            <view class="weui-msg__opr-area">
                <view class="weui-btn-area">
                    <button @click="login" class="weui-btn" type="default">登录</button>
                </view>
            </view>
        </view>
    </view>
    <view class="page" v-else>
      <view class="weui-form-preview ticket" v-for="(ticket, index) in tickets" @click="jumpToDetail(index)">
          <view class="weui-form-preview__hd">
              <view class="weui-form-preview__item">
                  <view class="weui-form-preview__label">{{ticket.number}}</view>
                  <view class="weui-form-preview__value_in-hd">{{status[ticket.status]}}</view>
              </view>
          </view>
          <view class="weui-form-preview__bd">
              <view class="weui-form-preview__item">
                  <view class="weui-form-preview__label">{{ (apiData.info.type==2) ? "机主" : "技术员"}}</view>
                  <view class="weui-form-preview__value">{{ticket.name}} {{ticket.phone}}</view>
              </view>
              <view class="weui-form-preview__item">
                  <view class="weui-form-preview__label">型号</view>
                  <view class="weui-form-preview__value">{{ticket.computer.brand}} {{ticket.computer.model}}</view>
              </view>
              <view class="weui-form-preview__item">
                  <view class="weui-form-preview__label">时间</view>
                  <view class="weui-form-preview__value">{{ticket.time}}</view>
              </view>
          </view>
      </view>
    </view>
  </div>
</template>

<script>
import fyAccount from '@/controller/fyaccount'
import repairApi from '@/controller/repairapi'

export default {
  data () {
    return {
      fyData: fyAccount.data,
      apiData: repairApi.data,
      tickets: [],
      status: ['尚未分配', '待确认', '已取消', '维修中', '已完成', '重新分配'],
      lastUpdate: null
    }
  },

  components: {
  },

  methods: {
    login () {
      wx.navigateTo({url: "/pages/my/login/main"})
    },
    jumpToDetail (index) {
      wx.navigateTo({url: "detail/main?number=" + this.tickets[index].number})
    }
  },

  onLoad () {
    fyAccount.init()
    repairApi.init()
  },

  onPullDownRefresh () {
    var vm = this
    vm.lastUpdate = new Date()
    repairApi.getTickets().then(e=>{
      if (e.code == 200){
        vm.tickets = e.data
      } else if (e.code == 401){
        fyAccount.logout()
        repairApi.logout()
        wx.showModal({
            content: '登录已失效，请重新登录',
            showCancel: false,
            success: function (res){
              vm.login()
            }
        })
      }
      wx.stopPullDownRefresh()
    })
  },

  onShow () {
    if ((this.lastUpdate==null || this.lastUpdate.getTime() - (new Date()).getTime() > 60000) && this.fyData.login) {
      wx.startPullDownRefresh()
    }
  }
}
</script>

<style>
.ticket {
  margin: 10px 0;
}
</style>
