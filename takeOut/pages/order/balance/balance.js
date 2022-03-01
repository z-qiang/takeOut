// pages/order/balance/balance.js
const fetch = require("../../../utils/fetch");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sumMonney: 0,
    cutMonney: 0,
    taken: '',
    cartList: '',
    max: '20',
    note: '',

  },
  gotopay: function(){
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 2000,
      success: function(){
        setTimeout(() => {
          wx.navigateTo({
            url: '../detail/detail',
          })
        },2000)
      }
    })
  },
  listenerTextarea: function(e){
    let note = e.detail.value;
    wx.setStorage({
      data: note,
      key: 'note',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //请求清单接口
    // fetch('/api/food/order','get',{order_id: options.order_id}).then((res) => {
    //   let foods = res.foods;
    //   let sum = 0;
    //   for(let i in foods){
    //     sum += foods[i].price * foods[i].num
    //   }
    //   if(res.promotion.length>0 && sum > res.promotion.discount){
    //     sum -= res.promotion.discount
    //   }
    //   this.setData({
    //     order: res.data,
    //     sumMonney: sum,
    //   })
    // })
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
          console.log(res.data)
          that.setData({
            sumMonney: res.data
          })
        }
      })
    } catch (e) {
      // Do something when catch error
      console.log("拿本地数据失败！",e)
    }
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