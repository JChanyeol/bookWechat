// pages/bookClassify/bookClassify.js
Page({
  data: {
    bcList: [
      { text: '所有图书', path: '../../images/bc-select.png', imgHide: false, banShow: true},
      { text: '我的书', path: '../../images/bc-select.png', imgHide: true, banShow: false },
      { text: '借入图书', path: '../../images/bc-select.png', imgHide: true, banShow: false },
      { text: '借出图书', path: '../../images/bc-select.png', imgHide: true, banShow: false }
    ],
    addBookHide: true
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分类'
    });
  },
  getBookClassify: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var bcList = that.data.bcList;
    for (var i in bcList){
      if(i == index){
        bcList[i].imgHide = false;
        bcList[i].banShow = true;
      }else{
        bcList[i].imgHide = true;
        bcList[i].banShow = false;
      }
    }
    that.setData({
      bcList: bcList
    })
  },
  getBookClassifyOver: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 新增分类
  addBookShow: function () {
    var that = this;
    var addBookHide = that.data.addBookHide;
    if (addBookHide == true){
      this.setData({
        addBookHide: false,
        focus: true
      })
    }else{
      this.setData({
        addBookHide: true
      })
    }
  },
  getBookClassifyValue: function (e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      addBookClassifyValue: value
    })
  },
  addBookClassify: function () {
    var that = this;
    var addBookClassifyValue = that.data.addBookClassifyValue;
    var value = addBookClassifyValue.replace(/(^\s+)|(\s+$)/g, "");
    var bcList = that.data.bcList;
    var book = {};
    if (value){
      book = { text: value, path: '../../images/bc-select.png', imgHide: true, banShow: false };
      bcList.push(book);
    }
    that.setData({
      bcList: bcList,
      addBookHide: true,
      addBookClassifyValue: ''
    })
  }
})