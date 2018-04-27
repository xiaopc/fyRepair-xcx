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
    pages: ['^pages/tickets/main', 'pages/tickets/detail/main',
            'pages/explore/main',
            'pages/my/main', 'pages/my/login/main', 'pages/my/info/main', 'pages/my/bind/main', 'pages/my/about/main'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#393a3f',
      navigationBarTitleText: '飞扬维修',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      selectedColor: '#46c01b',
      color: '#999999',
      list: [{
          iconPath: 'static/images/ticket_normal_48dp.png',
          selectedIconPath: 'static/images/ticket_active_48dp.png',
          pagePath: 'pages/tickets/main',
          text: '报修'
        },
        {
          iconPath: 'static/images/explore_normal_48dp.png',
          selectedIconPath: 'static/images/explore_active_48dp.png',
          pagePath: 'pages/explore/main',
          text: '发现'
        },
        {
          iconPath: 'static/images/my_normal_48dp.png',
          selectedIconPath: 'static/images/my_active_48dp.png',
          pagePath: 'pages/my/main',
          text: '我'
        }
      ]
    }
  }
}
