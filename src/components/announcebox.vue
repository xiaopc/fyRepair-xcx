<template>
  <view v-if="show" class="weui-cells weui-panel">
    <view class="weui-btn-area inline">
      <view style="width:100%">
          <view class="weui-label">公告 ({{announcements.length}})</view>
          <view class="cell-text" style="padding-top:5px">
            <swiper autoplay="true" interval="5000" duration="500" vertical="true" style="height: 70rpx">
              <block v-for="(announce, index) in announcements" :key="index">
                <swiper-item>
                  <view @click="openAnnounce(index)" style="color:#65b2e9">{{announce.title}}</view>
                </swiper-item>
              </block>
            </swiper>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
  import config from '@/config/config'
  import repairApi from '@/controller/repairapi'

  export default {
    props: [],
    data() {
      return {
        show: false,
        announcements: []
      }
    },
    onLoad() {
      var vm = this
      repairApi.getAnnounce().then(r => {
        if (r.code == 200) {
          vm.announcements = r.data
          vm.show = true
        }
      })
    },
    methods: {
      openAnnounce(index) {
        if (this.announcements[index].text) {
          wx.showModal({
            title: this.announcements[index].title,
            content: this.announcements[index].text,
            showCancel: false
          })
        }
      }
    }
  }
</script>

<style>

</style>
