import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/login/main',
            'pages/tickets/new/main', 'pages/tickets/list/main', 'pages/tickets/detail/main',
            'pages/admin/main',
            ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fafafa',
      navigationBarTitleText: '飞扬维修',
      navigationBarTextStyle: 'black',
      backgroundColor: '#fafafa'
    },
    networkTimeout: {
      request: 5000,
      downloadFile: 10000,
      uploadFile: 10000,
    },
    navigateToMiniProgramAppIdList: [
      "wx8abaf00ee8c3202e"
    ],
  }
}
