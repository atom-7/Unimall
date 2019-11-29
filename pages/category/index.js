// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenu:[],
    currentIndex:0,
    currentChild:[]// 右边商品列表
  },
  cateData:[],// 总分类数据
  onLoad: function (options) {
    this.getTab()
  },

  onReady: function () {

  },
  //!获取tab栏数据
  getTab(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/categories',
     success: (res) => {
        const{message} = res.data;
        // 设置给全局数据,因为数据太多不能直接给data
        this.cateData = message; 
        //过滤出来名字,数据小
        const leftNameList = message.map(item=>item.cat_name);
       // 设置左边菜单的数据   当前右列表的数据
        this.setData({
          leftMenu:leftNameList,
          currentChild:message[0].children
        })
      }
    });
      
  },
  //! 当点击tab栏触发的函数
  handleActive(e){
    // 取出当前点击目标身上的自定义属性索引,
    const {index} = e.currentTarget.dataset; // *这是给tab切换index激活样式用
    // 根据索引取出当前的对应右边列表的数据
    const currentChild = this.cateData[index].children;
    this.setData({
      currentIndex:index,
      currentChild
    })
  }

})