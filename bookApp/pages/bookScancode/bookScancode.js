// pages/bookScancode/bookScancode.js
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  toBorrowBookCondition: function () {
    wx.navigateTo({
      url: '../borrowBookCondition/borrowBookCondition',
    })
  }
})