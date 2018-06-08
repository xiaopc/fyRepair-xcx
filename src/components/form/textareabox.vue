<template>
  <view class="weui-btn-area">
      <view class="weui-cell weui-cell_textarea" :class="{focus: focus}">
          <view class="weui-cell__hd">
              <view class="weui-label">{{label}}</view>
          </view>
          <view class="weui-cell__bd weui-panel-content">
              <textarea @input="oInput" @change="oInput" class="weui-textarea" @focus="oFocus" @blur="oBlur"
                    :name="name" autocomplete="off" show-confirm-bar="false"/>
          <view class="weui-textarea-placeholder" v-show="placeholderShow">{{placeholder}}</view>
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
    oInput: function(e){
      this.textval = e.target.value
      this.$emit('input', e.target.value)
    },
    oFocus: function(e){
      this.focus = true
      this.$emit('focus')
    },
    oBlur: function(e){
      this.focus = false
      this.$emit('blur')
    },
  },

  computed:{
    placeholderShow: function(){
      var r = !((this.textval && 0!=this.textval.length) || this.focus)
      console.log("textval:"+this.textval)
      console.log("focus:"+this.focus)
      console.log("res:"+r)
      return r
    }
  }
}
</script>

<style>
.weui-cell_textarea{
  background: #fcfcfc;
  border-radius: 12rpx;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 0;
  transition: .15s all;
}
.weui-cell_textarea.focus{
  border: 1px solid rgba(0, 0, 0, 0.5);
}
.weui-cell_textarea .weui-label{
  background:#fafafa;
  color:#777777;
  text-align:center;
  line-height:3;
  font-size:28rpx;
  width:100%;
  height:80rpx;
  border-radius:12rpx 12rpx 0 0;
  position:absolute;
  top:0;
  border-bottom:2rpx solid #dadada;
  margin-right:10px;
}
.weui-panel-content {
  margin-top:40px;
  position:relative;
}
.weui-textarea{
  height:100px;
  padding:10px;
}
.weui-textarea-placeholder{
  position:absolute;
  padding:40px 0;
  text-align:center;
  top:0;
  right:0;
  bottom:0;
  left:0;
  margin:auto;
  height:20px;
  color:#c0c0c0;
  font-size:14px;
}
</style>
