const app = getApp()
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo;
        that.setData({
          userImg: res.userInfo.avatarUrl
        })
      }
    })
  },
  test: function (e) {
    console.log(e.detail)
  }
})