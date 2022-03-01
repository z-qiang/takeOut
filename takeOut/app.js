// app.js
App({
  isReloadOrderList: false,
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success:res => {
    //     console.log('login code' + res.code)
    //     if(res.code){
    //       wx.request({
    //         url: 'http://127.0.0:3000/login',
    //         method: 'post',
    //         data: {code: res.code},
    //         success: res => {
    //           console.log("token" + res.data.token)
    //           thia.globalData.token = res.data.token;
    //           wx.setStorage({
    //             data: res.data.token,
    //             key: token,
    //           })
    //         }
    //       })
    //     }else{
    //       console.log("登录失败" + res.errMsg)
    //     }
    //   },
    //   timeout: 0,
    // })
    // this.login()
  },
  globalData: {
    userInfo: false,
    token: null,
  }
})
