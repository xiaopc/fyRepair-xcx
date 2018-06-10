<template>
  <view class="weui-btn-area flex">
    <view class="weui-cell weui-cell_input" :class="{focus: focus}">
      <view class="weui-cell__hd">
        <view class="weui-label">{{label}}</view>
      </view>
      <view class="weui-cell__bd">
        <input class="weui-input" @focus="oFocus" @blur="oBlur " @input="oInput" @change="oInput" :name="name" :type="type" :placeholder="placeholder" :password="password" :maxlength="maxlength" />
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
      oInput: function(e) {
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
    }
  }
</script>

<style>

</style>
