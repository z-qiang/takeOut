// pages/lists/lists.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    toView: "a0",
    cartList: [],
    currentType: 0,
    currentIndex: 0,
    sumMonney: 0, // 总价钱
    cupNumber: 0, // 购物车里商品的总数量
    showCart: false, // 是否展开购物车
    loading: false,
    containerH: '',
    heightArr: [] // 数组:查找到的所有单元的内容高度
  },
  // test
  toto: function(){
    console.log(this.data.listData + "1111")
  },
  // 点击左侧菜单项选择
  selectMenu: function(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
      toView: "a" + index,
    })
  },
  // 加入购物车
  addToCart: function(e) {
    console.log(e)
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentType: type,
      currentIndex: index,
    });
    var a = this.data
    // 声明数组addItem
    var addItem = {
      "name": a.listData[a.currentType].foods[a.currentIndex].name,
      "price": a.listData[a.currentType].foods[a.currentIndex].specfoods[0].price,
      "number": 1,
      "sum": a.listData[a.currentType].foods[a.currentIndex].specfoods[0].price,
    }
    var sumMonney = a.sumMonney + a.listData[a.currentType].foods[a.currentIndex].specfoods[0].price;
    // 把新数组(addItem) push到 原数组cartList
    var cartList = this.data.cartList;
    cartList.push(addItem);
    this.setData({
      cartList: cartList,
      showModalStatus: false,
      sumMonney: sumMonney,
      cupNumber: a.cupNumber + 1
    });
  },
  // 展开购物车
  showCartList: function() {
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }
    console.log(this.data.showCart)
  },
  // 购物车添加商品数量
  addNumber: function(e) {
    var index = e.currentTarget.dataset.index;
    var cartList = this.data.cartList;
    cartList[index].number++;
    var sum = this.data.sumMonney + cartList[index].price;
    cartList[index].sum += cartList[index].price;
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      cupNumber: this.data.cupNumber + 1
    })
  },
  // 购物车减少商品数量
  decNumber: function(e) {
    var index = e.currentTarget.dataset.index;
    var cartList = this.data.cartList;
    var sum = this.data.sumMonney - cartList[index].price;
    cartList[index].sum -= cartList[index].price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      showCart: cartList.length == 0 ? false : true,
      cupNumber: this.data.cupNumber - 1
    });
  },
  // 清空购物车
  clearCartList: function() {
    this.setData({
      cartList: [],
      showCart: false,
      sumMonney: 0,
      cupNumber: 0
    });
  },
  
  // 点击"选好了"，缓存购物车的值
  goBalance: function(e) {
    if (this.data.sumMonney == 0) {
      return
    }
    wx.clearStorage()
    wx.setStorage({
      data: this.data.cartList,
      key: 'cartList',
      success: function(){
        console.log("ld成功")
      },
      fail: function(){
        console.log("失败")
      }
    });
    wx.setStorage({
      data: this.data.sumMonney,
      key: 'sumMonney',
    })
    
    // 请求接口返回参数{error: 0（错误代码）, order_id: 1}}
    const fetch = require('../../utils/fetch')
    var order_id = this.data.order_id
    var method = "POST"
    fetch("/api/food/order", method, {id: 1,num: 1}).then(function(res) {
      if (res.error !== 0) {
        wx.showModal({
          title: '下单失败',
          content: '操作失败请重试',
        })
        return
      }
      // 请求成功后跳转到订单确认页面，把返回的order_id订单编号传过去
      wx.navigateTo({
        url: '../order/balance/balance'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中',
    })
    const fetch = require('../../utils/fetch')
    fetch('/api/food/list','get',"{id: 1}").then((res) => {
      wx.hideLoading()
      console.log("这是发送成功了" + res)
      this.setData({
        listData: res,
        loading: true
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