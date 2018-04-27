export default {
    login () {
        return new Promise(function (resolve, reject){
            wx.login({
                success: (res) => {
                    console.log(res.code)
                    resolve(true)
                }
            })
        })
    },
    getUserInfo () {
        return new Promise(function (resolve, reject){
            wx.getUserInfo({
                success: (res) => {
                    resolve(res.userInfo)
                },
                fail: () => {
                    resolve(null)
                }
            })
        })
    },
    requireSetting () {
        return new Promise(function (resolve, reject){
            wx.openSetting({
                success: (res) => {
                    if (!res.authSetting["scope.userInfo"]) {
                        resolve(false)
                    } else {
                        resolve(true)
                    }
                },
                fail: res => {
                    resolve(false)
                }
            })
        })
    }
}