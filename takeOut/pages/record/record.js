// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
    name: '',
    hasUserInfo: true,
    imgc: 'top-name',
  },
  // getUserInfo: function(e){
  //   console.log(e.detail.userInfo)
  //   if(e.detail.userInfo){
  //     this.setData({
  //       userInfo: e.detail.userInfo,
  //       hasUserInfo: true
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 验证是否已经登录过
    const app = getApp()
    if(app.globalData.userInfo){
      this.setData({
        img: 'userAvatarUrl',
        name: 'userNickName',
        imgc:'top-name-show',
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  login: function(){
    // 将登录过的信息存储
    const app = getApp()
    app.globalData.userInfo = true;
    // 提示是否登录
    wx.showModal({
      title: '是否授权登录？',
      success: () => {
        this.setData({
          hasUserInfo: false,
          img: 'userAvatarUrl',
          name: 'userNickName',
          imgc:'',
        })
      }
    })
    // 发送登录请求
    const fetch = require('../../utils/fetch')
    wx.login({
      success: res => {
        if(res.code){
          console.log("有！！！" + res.code)
          fetch('/login','post',res.code).then((res) => {
            console.log(res)
            // 将token保存为多页面数据
            wx.setStorageSync('token',res);
          })
        }
       
        fail: () => {
          wx.showModal({
            thtle: '登录失败'
          })
        }
      },
      fail: (err)=>{
        console.log("失败？" + err)
      },
      timeout: 2000,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})