module.exports = function (path, method, data){
  return new Promise((resolve,reject) =>{
    wx.request({
      url: 'http://www.codeqiang.com' + path,
      method: method,
      data:{
        num: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success: function (res) {
        if (res.statusCode != 200) {
          reject({ error: '服务器忙，请稍后重试', code: 500 });
          return;
        }
        resolve(res.data);
      },
      fail: function(){
        reject();
        wx.showModal({
          showCancel: false,
          title: '失败'
        })
      }
    })
  })
}