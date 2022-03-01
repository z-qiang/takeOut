// pages/order/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sumMonney: 0,
    cartList: '',
    note: '',
    ordertime: '',  
    meunnumber: '',
  },
  getTime: function(){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    this.setData({
      ordertime: Y+'-'+M+'-'+D+' '+h+':'+m,
      meunnumber: m+''+s
    })
    console.log('年：'+Y+'月：'+M+'日：'+D+'fen:'+m+'miao:'+s);
    let that = this;
    wx.setStorageSync('orderTime', that.data.ordertime)
    wx.setStorageSync('meunnumber', that.data.meunnumber)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this
    try {
      wx.getStorage({
        key: 'cartList',
        success(res){
          console.log(res.data)
          that.setData({
            cartList: res.data
          })
          console.log("zheshi--:" + that.data.cartList)
        }
      })
    } catch (e) {
      // Do something when catch error
      console.log("拿本地数据失败！",e)
    }
    try {
      wx.getStorage({
        key: 'sumMonney',
        success(res){
          // console.log(res.data)
          that.setData({
            sumMonney: res.data
          })
        }
      })
      // 拿到note
      let note = wx.getStorageSync('note');
      this.setData({
        note: note
      })
    } catch (e) {
      // Do something when catch error
      console.log("拿本地数据失败！",e)
    }
    // 获取时间
    this.getTime();
     // 将信息存储到本地
     wx.setStorageSync('note',this.data.note)
    
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
    var that = this;
    // 页面销毁时跳转到 订单页
    let app = getApp();
    app.isReloadOrderList = true;
    wx.switchTab({
      url: '/pages/order/list/list',
    })
        
    
        
         
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