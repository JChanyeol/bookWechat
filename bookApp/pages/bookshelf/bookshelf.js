const app = getApp();
const tools = require('../../utils/tools.js');
// const conditionModel = require("../../utils/js/conditionModel.js");
Page({
  data: {
    bookShelfList: [
      // {
      //   path: 'https://img3.doubanio.com/view/subject/s/public/s28607882.jpg',
      //   title: 'Spring实战',
      //   borrowState: true,
      //   giveState: true,
      //   delPath: '../../images/b-del-fail.png',
      //   delState: false,
      //   delHide: true
      // },
    ],
    modelHide: true,
    toastHide: true,
    deleteHeaderHide: true,
    bookHeaderHide: false,
    bcList: [
      { text: '所有图书', path: '../../images/bc-select.png', imgHide: false, banShow: true },
      { text: '我的书', path: '../../images/bc-select.png', imgHide: true, banShow: false },
      { text: '借入图书', path: '../../images/bc-select.png', imgHide: true, banShow: false },
      { text: '借出图书', path: '../../images/bc-select.png', imgHide: true, banShow: false }
    ],
    addBookHide: true,
    bookClassifyHide: true,
    classAnimation: {},
    conditionAnimation: {},
    bcListSelect: '所有图书', //默认分类
    bookShelf: {}, //扫描获取的书籍信息
    scancodeModelHide: true,
    /* 借阅条件---begin */
    scaleList: ['天', '周', '月'],
    dateList: ['天', '周', '月'],
    depositValue: 0,
    rentValue: 0,
    maxDateValue: 0,
    scaleIndex: 1,
    dateIndex: 2,
    scaleValue: '周',
    dateValue: '月',
    borrowBookConditionHide: true
    /* 借阅条件---end */
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '书架'
    });
    // wx.request({
    //   url: 'http://47.105.55.56:8080/bookapi/Book/GetBookOnDouban',
    //   method: 'GET',
    //   data: {
    //     isbn: '9787111502067',
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     var data = res.data.Value;
    //     for (var i in data) {
    //       data[i].delPath = '../../images/b-del-fail.png';
    //       data[i].delState = false;
    //       data[i].delHide = true;
    //     }
    //     console.log(data)
    //     that.setData({
    //       bookShelfList: data
    //     })
    //   }
    // })

  },
  getMore: function () {
    var that = this;
    var bookShelf = {};
    wx.scanCode({
      success: (res) => {
        var isbn = res.result;
        console.log(isbn)
        tools.wxRequest({
          url: "book/getBookOnDouban/" + isbn,
          method: "POST",
          // data: {
          //   isbn: isbn,
          // },
          success: function (res) {
            console.log(res);
            var value = res.data.data;
            bookShelf = {
              path: value.images.small,
              title: value.title,
              author: value.author,
              summary: value.summary,
              State: 2,
              // id: value.id,
              delPath: '../../images/b-del-fail.png',
              delState: false,
              delHide: true
            }
            var bookDTO = [
              {
                ISBNID: isbn,
                Title: value.title,
                Author: value.author,
                Image: value.images.small,
                Rating: value.rating.average,
                Publisher: value.publisher,
                Translator: value.translator,
                Price: value.price,
                Author_Intro: value.author_intro,
                CityName: '成都',
                Cost: 0,
                Deposite: 0,
                ReturnPeriod: '2018-06-06',
                State: 2,
                id: value.id,
                phoneNo: "13804406707"
              }
            ]
            that.setData({
              bookDTO: bookDTO,
              bookShelf: bookShelf,
              scancodeModelHide: false
            })
          },
          fail: function (res) {
            console.log(res);
          },
        });
        
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  // 保存用户添加的书籍信息
  saveBook: function (bookDTO) {
    var that = this;
    var bookShelfList = that.data.bookShelfList;
    var bookShelf = that.data.bookShelf;
    tools.wxRequest({
      url: "book/uploadBook",
      method: "POST",
      data: {
        bookId: 6,
        bookshelfId: 1,
        createTime: '',
        id: '',
        updateTime: '',
        userId: 1
      },
      success: function (res) {
        console.log(res)
        // if (res.data.title == '请求成功') {
        //   bookShelfList.push(bookShelf);
        // }
        bookShelfList.push(bookShelf);
        that.setData({
          bookShelfList: bookShelfList,
          scancodeModelHide: true
        })
      },
      fail: function (res) {
        console.log(res);
      },
    });
  },
  // 确定上架
  addBookToShelf: function () {
    var that = this;  
    var bookDTO = that.data.bookDTO; 
    console.log(bookDTO)
    that.saveBook(bookDTO) 
  },
  // 取消上架
  scancodeModelCancel: function () {
    var that = this;
    that.setData({
      scancodeModelHide: true
    })
  },
  // 点击编辑
  toBookEdit: function () {
    var that = this;
    var bookShelfList = that.data.bookShelfList;
    for (var i in bookShelfList) {
      bookShelfList[i].delHide = false;
    }
    that.setData({
      bookShelfList: bookShelfList,
      bookHeaderHide: true,
      deleteHeaderHide: false
    })
  },
  // 选择要删除的书籍
  selectBook: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var bookShelfList = that.data.bookShelfList;
    var deleteHeaderHide = that.data.deleteHeaderHide;
    if (deleteHeaderHide == false){
      for (var i in bookShelfList) {
        if (i == index) {
          if (bookShelfList[i].delState == false) {
            bookShelfList[i].delPath = '../../images/b-del-succ.png';
            bookShelfList[i].delState = true;
          } else {
            bookShelfList[i].delPath = '../../images/b-del-fail.png';
            bookShelfList[i].delState = false;
          }
        }
      }
    }
    that.setData({
      bookShelfList: bookShelfList
    })
  },
  // 点击完成弹出确认框
  isDeleteBook: function () {
    var that = this;
    var bookShelfList = that.data.bookShelfList;
    var isDelete = false;
    for (var i in bookShelfList) {
      if (bookShelfList[i].delState == true) {
        isDelete = true;
      }
    }
    if (isDelete == true) {
      that.setData({
        modelHide: false
      })
    } else {
      that.setData({
        toastHide: false
      })
      setTimeout(function () {
        that.setData({
          toastHide: true
        })
      }, 2000)
    }
  },
  // 点击移出删除选中书籍
  deleteBook: function () {
    var that = this;
    var bookShelfList = that.data.bookShelfList;
    var id = [] , data = [];
    console.log(bookShelfList)
    for (var i in bookShelfList) {
      if (bookShelfList[i].delState == true) {
        id.push(bookShelfList[i].id)
      }
      bookShelfList[i].delHide = true;
      bookShelfList[i].delPath = '../../images/b-del-fail.png';
      bookShelfList[i].delState = false;
    }
    id = [5,6,7]
    console.log(id)
    tools.wxRequest({
      url: "book/markDeleted",
      method: "POST",
      header: 'application/form',
      data: {
        userId : 1,
        bookshelfId : 1,
        bookId: id
      },
      success: function (res) {
        console.log(res)
        // data = res.data.Value.UpLoadBooks;
        // for (var i in data) {
        //   data[i].delPath = '../../images/b-del-fail.png';
        //   data[i].delState = false;
        //   data[i].delHide = true;
        // }
        // console.log(data)
        // that.setData({
        //   bookShelfList: data
        // })
      },
      fail: function (res) {
        console.log(res);
      },
    });
    that.setData({
      modelHide: true,
      bookHeaderHide: false,
      deleteHeaderHide: true
    })
  },
  deleteBookCancel: function () {
    var that = this;
    that.setData({
      modelHide: true
    })
  },
  // 点击取消
  toBookshelf: function () {
    var that = this;
    var bookShelfList = that.data.bookShelfList;
    for (var i in bookShelfList) {
      bookShelfList[i].delHide = true;
      bookShelfList[i].delPath = '../../images/b-del-fail.png';
      bookShelfList[i].delState = false;
    }
    that.setData({
      bookShelfList: bookShelfList,
      bookHeaderHide: false,
      deleteHeaderHide: true
    })
  },
  // 分类---begin
  toBookClassify: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(600).step()
    that.setData({
      classAnimation: animation.export(),
      bookClassifyHide: false
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        classAnimation: animation.export()
      })
    }, 200)
  },
  getBookClassify: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var bcList = that.data.bcList;
    var bcListSelect;
    for (var i in bcList) {
      if (i == index) {
        bcList[i].imgHide = false;
        bcList[i].banShow = true;
        bcListSelect = bcList[i].text;
      } else {
        bcList[i].imgHide = true;
        bcList[i].banShow = false;
      }
    }
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(0).step()
    that.setData({
      classAnimation: animation.export(),
      bookClassifyHide: false
    })
    setTimeout(function () {
      animation.translateY(600).step()
      that.setData({
        classAnimation: animation.export()
      })
    }, 200)
    that.setData({
      bcList: bcList,
      bcListSelect: bcListSelect
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
    if (addBookHide == true) {
      this.setData({
        addBookHide: false,
        focus: true
      })
    } else {
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
    if (value) {
      book = { text: value, path: '../../images/bc-select.png', imgHide: true, banShow: false };
      bcList.push(book);
    }
    that.setData({
      bcList: bcList,
      addBookHide: true,
      addBookClassifyValue: ''
    })
  },
  // 分类---end

  // 借阅条件---begin
  toBorrowBookCondition: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(600).step()
    that.setData({
      conditionAnimation: animation.export(),
      borrowBookConditionHide: false
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        conditionAnimation: animation.export()
      })
    }, 200)
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
    var scaleList = that.data.scaleList;
    var dateList = that.data.dateList;
    var scaleValue = scaleList[scaleIndex];
    var dateValue = dateList[dateIndex];
    that.setData({
      depositValue: depositValue,
      rentValue: rentValue,
      maxDateValue: maxDateValue,
      scaleIndex: scaleIndex,
      dateIndex: dateIndex,
      scaleValue: scaleValue,
      dateValue: dateValue
    })
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(0).step()
    that.setData({
      conditionAnimation: animation.export(),
      borrowBookConditionHide: false
    })
    setTimeout(function () {
      animation.translateY(600).step()
      that.setData({
        conditionAnimation: animation.export()
      })
    }, 200)
  },
  backMyBookDetail: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(0).step()
    that.setData({
      conditionAnimation: animation.export(),
      borrowBookConditionHide: false
    })
    setTimeout(function () {
      animation.translateY(600).step()
      that.setData({
        conditionAnimation: animation.export()
      })
    }, 200)
  }
  // 借阅条件---end
})