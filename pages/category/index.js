// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[],
    currentIndex:0,
    currentChild:[]
  },
  onLoad: function (options) {
    this.getTab()
  },

  onReady: function () {

  },
  //获取tab栏数据
  getTab(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/categories',
     success: (res) => {
        const{message} = res.data;
        console.log(message);
        this.setData({
          tabList:message,
          currentChild:message[0].children
        })
      }
    });
      
  },
  // 当点击tab栏触发的函数
  handleActive(e){
    const {child:currentChild,index:currentIndex} = e.currentTarget.dataset;
    this.setData({
      currentIndex,
      currentChild
    })
  }

})