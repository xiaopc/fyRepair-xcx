import config from '@/config/config'

var accountData = {
    login: false,
    username: null,
    ssoCookies: null,
    info: {
        user_id: null,
        name: null,
        cell: null,
        email: null,
        qq: null,
        vip: 0,
    }
}

export default{
    data: accountData,
    init () {
        var sess = (wx.getStorageSync('fyAccount') || null)
        if (sess != "") accountData = Object.assign(accountData, sess)
    },
    login (e) {
        var vm = this
        return new Promise(function (resolve){
            var header = {
                'content-type': 'application/x-www-form-urlencoded', 
                'cookie': vm.data.ssoCookies
            }
            var url = config.sso.apiBase+"fastlogin"
            var datas = {
                appid: config.sso.appId,
                username: e.username,
                otpcode: e.otpcode
            }
            wx.request({
                url: url,
                method: "POST",
                header: header,
                data: datas,
                success(res) {
                    if (res.data.code==200){
                        vm.data.login = true
                        vm.data.ssoCookies = res.header["Set-Cookie"]
                        vm.data.username = e.username
                        wx.setStorageSync("fyAccount", vm.data)
                        resolve({code: 200, info: {uid: res.data.uid, token: res.data.token, new: (res.data.profile == 100)}})
                    } else {
                        resolve({code: 400, info: config.sso.errorCode[res.data.code]})
                    }
                },
                fail() {
                    resolve({code: 500, info: "网络错误"})
                }
            })
        })
    },
    logout () {
        var vm = this
        vm.data.login = false
        vm.data.ssoCookies = null
        wx.removeStorageSync("fyAccount")
    },
    updateInfo (e) {
        accountData.login = true
        accountData.username = e.cell
        accountData.info = Object.assign(accountData.info, e)
        wx.setStorageSync("fyAccount", accountData)
    }
    
}