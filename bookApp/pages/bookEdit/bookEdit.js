// pages/bookshelf/bookshelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookShelfList: [
      {
        path: 'https://img3.doubanio.com/view/subject/s/public/s28607882.jpg',
        title: 'Spring实战',
        borrowState: true,
        giveState: true,
        delPath: '../../images/b-del-fail.png',
        delState: false
      },
      {
        path: 'https://img3.doubanio.com/view/subject/s/public/s28607882.jpg',
        title: 'Spring实战',
        borrowState: false,
        giveState: true,
        delPath: '../../images/b-del-fail.png',
        delState: false
      },
      {
        path: 'https://img3.doubanio.com/view/subject/s/public/s28607882.jpg',
        title: 'Spring实战',
        borrowState: true,
        giveState: true,
        delPath: '../../images/b-del-fail.png',
        delState: false
      },
      {
        path: 'https://img3.doubanio.com/view/subject/s/public/s28607882.jpg',
        title: 'Spring实战',
        borrowState: true,
        giveState: false,
        delPath: '../../images/b-del-fail.png',
        delState: false
      },
    ],
    modelHide: true,
    toastHide: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '编辑'
    });
  },
  selectBook: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var bookShelfList = that.data.bookShelfList;
    for (var i in bookShelfList){
      if(i == index){
        if (bookShelfList[i].delState == false){
          bookShelfList[i].delPath = '../../images/b-del-succ.png';
          bookShelfList[i].delState = true;
        }else{
          bookShelfList[i].delPath = '../../images/b-del-fail.png';
          bookShelfList[i].delState = false;
        }       
      }
    }
    that.setData({
      bookShelfList: bookShelfList
    })
  },
  isDeleteBook: function () {
    var that = this;
    var bookShelfList = that.data.bookShelfList;
    var isDelete = false;
    for (var i in bookShelfList) {
      if (bookShelfList[i].delState == true) {
        isDelete = true;
      }
    }
    if (isDelete == true){
      that.setData({
        modelHide: false
      })
    }else{
      that.setData({
        toastHide: false
      })
      setTimeout(function () {
        that.setData({
          toastHide: true
        })
      },2000)
    }
  },
  deleteBook: function () {
    var that = this;
    var bookShelfList = that.data.bookShelfList;
    for (var i in bookShelfList){
      if (bookShelfList[i].delState == true){
        console.log(bookShelfList[i])
        bookShelfList.splice(i,1);
      }
    }
    that.setData({
      modelHide: true,
      bookShelfList: bookShelfList
    })
  },
  deleteBookCancel: function () {
    var that = this;
    that.setData({
      modelHide: true
    })
  },
  toBookshelf: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})