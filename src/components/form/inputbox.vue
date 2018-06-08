<template>
  <view class="weui-btn-area">
      <view class="weui-cell weui-cell_input" :class="{focus: focus}">
          <view class="weui-cell__hd">
              <view class="weui-label">{{label}}</view>
          </view>
          <view class="weui-cell__bd">
              <input class="weui-input"
                    @focus="oFocus" @blur="oBlur "@input="oInput" @change="oInput" 
                    :name="name" :type="type" :placeholder="placeholder" :password="password" :maxlength="maxlength"/>
          </view>
      </view>  
  </view>

</template>

<script>
export default {
  props: ['name', 'label', 'placeholder', 'type', 'password', 'maxlength'],

  data() {
    return {
        name: null,
        label: null,
        placeholder: "",
        type: "text",
        password: false,
        focus: false,
        maxlength: "140"
    }
  },

  methods: {
    oInput: function(e){
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
  }
}
</script>

<style>
.weui-cell_input{
  background: #fcfcfc;
  border-radius: 12rpx;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 0;
  transition: .15s all;
}
.weui-cell_input.focus{
  border: 1px solid rgba(0, 0, 0, 0.5);
}
.weui-cell_input .weui-label{
  background:#fafafa;
  color:#777777;
  text-align:center;
  line-height:3;
  font-size:28rpx;
  width:160rpx;
  height:80rpx;
  border-radius:12rpx 0 0 12rpx;
  border-right:1px solid #dadada;
  margin-right:10px;
}

</style>
