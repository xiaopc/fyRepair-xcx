<template>
  <div class="submit-btn">
    <form @submit="formSubmit">
      <view class="weui-btn-area">
        <button class="weui-btn" :type="type" formType="submit" :size="size" :loading="loading" :disabled="loading||disabled">
                  {{text}}
              </button>
      </view>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['data', 'text', 'loading', 'disabled', 'size', 'type'],
    data() {
      return {
        data: null,
        type: "primary",
        text: null,
        size: "default",
        loading: false,
        disabled: false
      }
    },
    methods: {
      formSubmit: function(e) {
        this.$emit('submit')
      }
    }
  }
</script>

<style>

</style>
