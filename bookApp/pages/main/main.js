const app = getApp()
const tools = require('../../utils/tools.js');
Page({
  data: {
  
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发现'
    });
    wx.login({
      success: function (res) {
        console.log(res.code)
        if (res.code) {
          tools.wxRequest({
            url: "auth/wxLogin/"+res.code,
            method: "POST",
            success: function (res) {
              console.log(res)
            },
            fail: function (res) {
              console.log(res);
            },
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: res => {
    //           app.globalData.userInfo = res.userInfo;
    //         }
    //       })
    //     }
    //   }
    // })
  },
  toBookDetails: function () {
    wx.navigateTo({
      url: '../bookDetails/bookDetails',
    })
  }
})