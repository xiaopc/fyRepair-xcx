<template>
  <view class="weui-btn-area">
    <view class="weui-cell weui-cell_textarea" :class="{focus: focus}">
      <view class="weui-cell__hd">
        <view class="weui-label">{{label}}</view>
      </view>
      <view class="weui-cell__bd weui-panel-content">
        <textarea @input="oInput" @change="oInput" class="weui-textarea" @focus="oFocus" @blur="oBlur" :name="name" autocomplete="off" show-confirm-bar="false" auto-height="true" />
        <!--<view class="weui-textarea-placeholder" v-show="placeholderShow">{{placeholder}}</view>-->
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: ['name', 'label', 'placeholder', 'type'],
    data() {
      return {
        textval: "",
        name: null,
        label: null,
        placeholder: "",
        focus: false
      }
    },
    methods: {
      oInput: function(e) {
        this.textval = e.target.value
        this.$emit('input', e.target.value)
      },
      oFocus: function(e) {
        this.focus = true
        this.$emit('focus')
      },
      oBlur: function(e) {
        this.focus = false
        this.$emit('blur')
      },
    },
    computed: {
      placeholderShow: function() {
        var r = !((this.textval && 0 != this.textval.length) || this.focus)
        //console.log("textval:" + this.textval)
        //console.log("focus:" + this.focus)
        //console.log("res:" + r)
        return r
      }
    }
  }
</script>

<style>
  .weui-cell_textarea {
    background: #fff;
    padding: 0;
    transition: .15s all;
    border-bottom: 4rpx solid #e0e0e0;
  }
  .weui-cell_textarea.focus {
    border-bottom-color: #65b2e9;
  }
  .weui-panel-content {
    position: relative;
  }
  .weui-textarea {
    min-height: 80rpx;
    line-height: 2.5;
    font-size: 40rpx;
  }
  .weui-textarea-placeholder {
    position: absolute;
    text-align: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    height: 20px;
    color: #c0c0c0;
    font-size: 14px;
  }
</style>
