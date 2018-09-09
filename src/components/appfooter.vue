<template>
  <div class="footer">
    <view style="text-align: center; color: #b2b2b2; font-size: 0.8em;">
        <navigator target="miniProgram" open-type="navigate" app-id="wx8abaf00ee8c3202e" :extra-data=extraData version="release">遇到问题？</navigator>
    </view>
  </div>
</template>

<script>
  import config from '@/config/config'

  export default {
    props: [],
    data() {
      return {
        extraData: {
          id: config.tucao.id
        }
      }
    },
    methods: {
    }
  }
</script>

<style>

</style>
