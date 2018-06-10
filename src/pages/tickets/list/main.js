import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
    config: {
        navigationBarTitleText: '维修单',
        enablePullDownRefresh: true
    }
  }