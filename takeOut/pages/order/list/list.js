// pages/order/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderFoods: [],
    sum: [1],
    is_show: false,
    b_show: true,
  }, 
  // 清空所有
  suuu: function(){
    this.setData({
      orderFoods: ''
    })
  },
  // 跳转点餐页面
  goFood: function(){
    wx.navigateTo({
      url: '/pages/lists/lists',
    })
  }, 
  // 查看订单详细
  showList: function(e){
    let index = e.currentTarget.dataset.index
    let mes = this.data.orderFoods[index]
    wx.navigateTo({
      url: '../list_two/list_two?index=' + index,
    })
    wx.setStorageSync('orderFoodsList', this.data.orderFoods)
    console.log(mes)
  },  
  dataShow: function(){
    var that = this
    // 从本地拿到订单信息
    try{
      let orderTime = wx.getStorageSync('orderTime');
      let cartList = wx.getStorageSync('cartList');
      let sumMonney = wx.getStorageSync('sumMonney');
      let length = cartList.length
      let meunnumber = wx.getStorageSync('meunnumber');
      let note = wx.getStorageSync('note');
      let orderFood = {
        orderTime: orderTime,
        cartList: cartList,
        sumMonney: sumMonney,
        length: length,
        meunnumber: meunnumber,
        note: note,
      }
        if(sumMonney != ''){
          this.setData({
            orderFoods: this.data.orderFoods.concat(orderFood)
          })
        }
        // 将数据清除，阻止重复渲染
        wx.setStorage({
          data: '',
          key: 'sumMonney',
        })
        //是否显示到底信息
        if(this.data.orderFoods.length >= 8){
          this.setData({
            is_show: true
          })
        }
        // 是否显示点餐信息
        if(this.data.orderFoods.length != ''){
          this.setData({
            b_show: false
          })
        }

      }catch(e){
      console.log('错误' + e)
    }
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
    this.dataShow();    
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
    console.log("页面卸载了")
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