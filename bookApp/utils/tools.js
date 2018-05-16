const app = getApp();
//本地环境
const baseUrl = "http://47.105.55.56:8080/";

function wxRequest(req) {
  wx.request({
    url: baseUrl + req.url,
    data: req.data,
    method: req.method,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.title != "请求成功") {
        req.success(res);
      }
      // var result = res.data;
    },
    fail: function (res) {
      req.fail(res);
    },
  });
}



module.exports = {
  wxRequest: wxRequest,
};