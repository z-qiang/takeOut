// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: '',
  },
  // banner图点击的方法
  gostart: function(){
    wx.navigateTo({
      url: '/pages/lists/lists',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取轮播图数据
    wx.showLoading({
      title: '努力加载中',
    })
    const fetch = require('../../utils/fetch')
    fetch('/api/food/index','get',"{id: 1}").then((res) => {
      wx.hideLoading()
      this.setData({
        listData : res
      })
    }).catch((err) => {console.log(err)})
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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

  }
})