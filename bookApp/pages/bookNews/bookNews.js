Page({
  data: {
  
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '消息'
    });
  },
  toBorrowBookDetail: function () {
    wx.navigateTo({
      url: '../borrowBookDetail/borrowBookDetail',
    })
  }
})