<template>
  <div style="overflow:hidden">
    <userbox :disabled="apiData.new==null" :usertype="apiData.info.type" functype="0" :indata="fyData.info" @input="nameInput" />
    <view class="weui-cells weui-panel">
      <view class="weui-btn-area">
        <view class="weui-label">设备</view>
        <radio-group class="radio-group" @change="selectDevice">
          <label class="radio" v-for="(item, index) in devices" :key="item.computer_id">
              <radio color="#69b4ea" :value="item.computer_id"/> {{item.brand}} {{item.model}}
            </label>
          <label class="radio">
              <radio color="#69b4ea" value="0"/> 新增
            </label>
        </radio-group>
      </view>
    </view>
    <view class="weui-cells weui-panel" :class="{active: isPanel1Focus}" v-if="sendData.selectDevice==0">
      <inputbox @focus="panel1Focus" @blur="panel1Blur" @input="brandInput" label="品牌" name="brand" />
      <inputbox @focus="panel1Focus" @blur="panel1Blur" @input="modelInput" label="型号" name="model" />
      <view class="weui-btn-area" style="display:flex">
        <view style="width:100%">
          <view class="weui-label">购买时间</view>
          <picker mode="date" fields="month" start="2000-01" end="2020-09" @change="dateChange">
            <view class="weui-cell_input weui-input">{{(sendData.newDeviceDate==null)?"":sendData.newDeviceDate}}</view>
          </picker>
        </view>
        <view style="width:150%;padding:35px 0 0 0;color: #b2b2b2;text-align:right;">拆机可能导致保修失效</view>
      </view>
    </view>
    <view class="weui-cells weui-panel" :class="{active: isPanel2Focus}">
      <textareabox @focus="textareaFocus" @blur="textareaBlur" @input="textareaInput" label="故障描述" name="username" placeholder="简单描述你遇到的问题..." />
    </view>
    <singlebtn :disabled="!isFinish" @submit="submit" text="立即报修" size="default" type="primary" />
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
        isPanel1Focus: false,
        isPanel2Focus: false,
        devices: [],
        sendData: {
          name: null,
          detail: null,
          selectDevice: null,
          newDeviceBrand: null,
          newDeviceModel: null,
          newDeviceDate: null
        }
      }
    },
    components: {
      singlebtn,
      inputbox,
      textareabox,
      userbox
    },
    methods: {
      nameInput: function(e) {
        this.sendData.name = e
      },
      textareaFocus: function(e) {
        this.isPanel2Focus = true
      },
      textareaBlur: function(e) {
        this.isPanel2Focus = false
      },
      textareaInput: function(e) {
        this.sendData.detail = e
      },
      selectDevice: function(e) {
        this.sendData.selectDevice = e.target.value
      },
      panel1Focus: function(e) {
        this.isPanel1Focus = true
      },
      panel1Blur: function(e) {
        this.isPanel1Focus = false
      },
      brandInput: function(e) {
        this.sendData.newDeviceBrand = e
      },
      modelInput: function(e) {
        this.sendData.newDeviceModel = e
      },
      dateChange: function(e) {
        this.sendData.newDeviceDate = e.target.value
      },
      submit: function(e) {
        var vm = this
        if (vm.isFinish) {
          repairApi.newTicket(this.sendData).then(r => {
            wx.reLaunch({
              url: "../list/main"
            })
          }).catch(e => {
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              duration: 2000
            })
          })
        }
      }
    },
    computed: {
      isFinish: function() {
        if (this.apiData.new && (this.sendData.name == null || this.sendData.name == "")) return false
        if (this.sendData.detail == null || this.sendData.detail == "") return false
        if (this.sendData.selectDevice == null) return false
        if (this.sendData.selectDevice == 0) {
          if (this.sendData.newDeviceBrand == null || this.sendData.newDeviceBrand == "") return false
          if (this.sendData.newDeviceModel == null || this.sendData.newDeviceModel == "") return false
          if (this.sendData.newDeviceDate == null || this.sendData.newDeviceDate == "") return false
        }
        return true
      },
    },
    onLoad() {
      var vm = this
      fyAccount.init()
      repairApi.init()
      repairApi.getActiveTickets().then(r => {
        if (r.code == 200 && r.data > 0) {
          wx.reLaunch({
            url: "/pages/tickets/list/main"
          })
        }
      })
      repairApi.getDevices().then(r => {
        vm.devices = r
      }).catch(e => {
        wx.showToast({
          title: '获取设备信息失败',
          icon: 'none',
          duration: 2000
        })
      })
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
