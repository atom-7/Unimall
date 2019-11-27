// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[],
    currentIndex:0
  },
  onLoad: function (options) {
    this.getTab()
  },

  onReady: function () {

  },
  getTab(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/categories',
     success: (res) => {
        const{message} = res.data;
        console.log(res);
        this.setData({
          tabList:message
        })
      }
    });
      
  }

})