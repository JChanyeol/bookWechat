const app = getApp();
Page({
  data: {
    scaleList: ['每天', '每周', '每月', '每年'],
    dateList: ['天', '月', '年'],
    scaleIndex: 1,
    dateIndex: 1
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '借阅条件'
    });
  },
  scalePickerChange: function (e) {
    this.setData({
      scaleIndex: e.detail.value
    })
  },
  datePickerChange: function (e) {
    this.setData({
      dateIndex: e.detail.value
    })
  },
  // 获取押金值
  depositValue: function (e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      depositValue: value
    })
  },
  // 获取租金值
  rentValue: function (e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      rentValue: value
    })
  },
  // 获取最长期限
  maxDateValue: function (e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      maxDateValue: value
    })
  },
  // 点击确定
  setComplate: function () {
    var that = this;
    var depositValue = that.data.depositValue;
    var rentValue = that.data.rentValue;
    var maxDateValue = that.data.maxDateValue;
    var scaleIndex = that.data.scaleIndex;
    var dateIndex = that.data.dateIndex;
    app.globalData.depositValue = depositValue;
    app.globalData.rentValue = rentValue;
    app.globalData.maxDateValue = maxDateValue;
    app.globalData.scaleIndex = scaleIndex;
    app.globalData.dateIndex = dateIndex;
    wx.navigateBack({
      delta: 1
    })
  },
  backMyBookDetail: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})