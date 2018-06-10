<template>
  <div class="user-panel">
    <form>
      <view class="page__bd">
        <view class="weui-cells weui-panel" :class="{active: isPanelFocus}">
          <view class="weui-btn-area inline">
            <view style="width:100%">
              <view class="weui-label">账号</view>
              <view class="cell-text">{{indata.cell}}</view>
            </view>
            <view class="weui-btn-area inline-btn" style="height:23px;margin-top:3px;">
              <button :class="{red: btnStyle}" @click="btnClick" class="weui-btn inline">{{ (functype==0)?"更多":"退出" }}</button>
            </view>
          </view>
          <view class="weui-btn-area" v-if="disabled || usertype == 1">
            <view class="weui-label">{{ (usertype==2)?"统计" : "姓名" }}</view>
            <view class="cell-text" style="word-spacing:10rpx;">{{ (usertype==2)?text : indata.name }}</view>
          </view>
          <inputbox v-else @focus="oFocus" @blur="oBlur" @input="cellInput" label="姓名" name="name" maxlength="8" />
        </view>
      </view>
    </form>
  </div>
</template>

<script>
  import inputbox from '@/components/form/inputbox'
  import repairApi from '@/controller/repairapi'
  export default {
    props: ['disabled', 'usertype', 'functype', 'indata', 'text'],
    components: {
      inputbox
    },
    data() {
      return {
        disabled: true,
        usertype: 0, // 0 for user, 1 for staff
        functype: 0, // 0 for more, 1 for logout
        indata: null,
        text: "",
        isPanelFocus: false,
        name: "",
      }
    },
    onload: function() {
      repairApi.init()
    },
    methods: {
      oFocus: function() {
        this.isPanelFocus = true
        this.$emit('focus')
      },
      oBlur: function() {
        this.isPanelFocus = false
        this.$emit('blur')
      },
      cellInput: function(e) {
        this.name = e
        this.$emit('input', e)
      },
      btnClick: function(e) {
        switch (this.functype) {
          case "0":
            wx.navigateTo({
              url: "/pages/tickets/list/main"
            })
            break;
          case "1":
            repairApi.logout()
            break;
        }
      }
    },
    computed: {
      btnStyle: function() {
        return this.functype == 1
      }
    }
  }
</script>

<style>
  .inline {
    display: flex;
  }
</style>
