const app = getApp();
Page({
  data: {
    depositValue: 0, //押金
    rentValue: 0, //租金
    maxDateValue: 1, //期限
    scaleValue: '周', //租金单位
    dateValue: '月' //年限
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
    var that = this;
    var scaleIndex = app.globalData.scaleIndex;
    var dateIndex = app.globalData.dateIndex;
    var depositValue = that.data.depositValue;
    var rentValue = that.data.rentValue;
    var maxDateValue = that.data.maxDateValue;
    var scaleValue = that.data.scaleValue;
    var dateValue = that.data.dateValue;
    if (app.globalData.depositValue){
      depositValue = app.globalData.depositValue;
    }
    if (app.globalData.rentValue) {
      rentValue = app.globalData.rentValue;
    }
    if (app.globalData.maxDateValue){
      maxDateValue = app.globalData.maxDateValue;
    }
    if (scaleIndex){
      if (scaleIndex == 0) {
        scaleValue = '天';
      } else if (scaleIndex == 1) {
        scaleValue = '周';
      } else if (scaleIndex == 2) {
        scaleValue = '月';
      } else if (scaleIndex == 3) {
        scaleValue = '年';
      }
    }
    if (dateIndex){
      if (dateIndex == 0) {
        dateValue = '天';
      } else if (dateIndex == 1) {
        dateValue = '月';
      } else if (dateIndex == 2) {
        dateValue = '年';
      } 
    }
    that.setData({
      depositValue: depositValue,
      rentValue: rentValue,
      maxDateValue: maxDateValue,
      scaleValue: scaleValue,
      dateValue: dateValue
    })
  },
  toBorrowBookCondition: function () {
    wx.navigateTo({
      url: '../borrowBookCondition/borrowBookCondition',
    })
  }
})