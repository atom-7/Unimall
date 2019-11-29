import Axios from '../../request/axios';
Page({

  data: {
    leftMenu: [],
    currentIndex: 0,
    currentChild: [],//? 右边商品列表
    scrollTop: 0     //? 控制列表滚动条距离的
  },
  cateData: [],//? 总分类数据
  onLoad: function (options) {
    //todo 如果没有catadata 就是""
    const getOldData = wx.getStorageSync('cateData');
    //* 判断是否有存过旧数据
    if (!getOldData) {  // ? 没存就重新获取数据

      this.getTab()
    }
    else {  //? 这是有存的情况
    
      if (+new Date() - getOldData.time> 10 * 1000) {  // todo  判断过期了没    两者时间差不得超过 10 S
        console.log('过期了');
        
        this.getTab();
      }
      // ? 没有过期,用旧数据
      else {
        console.log('没有过期');
        
        this.cateData = getOldData.list;
        //过滤出来名字,数据小
        const leftNameList = getOldData.list.map(item => item.cat_name);
        // 设置左边菜单的数据   当前右列表的数据
        this.setData({
          leftMenu: leftNameList,
          currentChild:getOldData.list[0].children
        })

      }
    }


  },
  axios: Axios,  //!自定义
  onReady: function () {

  },
  //!获取tab栏数据
  getTab() {
    this.axios({
      url: 'https://api.zbztb.cn/api/public/v1/categories'
    }).then((res) => {
      const { message } = res.data;
      // 设置给全局数据,因为数据太多不能直接给data
      this.cateData = message;
      wx.setStorageSync('cateData', { list: message, time:+new Date()});

      //过滤出来名字,数据小
      const leftNameList = message.map(item => item.cat_name);
      // 设置左边菜单的数据   当前右列表的数据
      this.setData({
        leftMenu: leftNameList,
        currentChild: message[0].children
      })
    })

  },
  //! 当点击tab栏触发的函数
  handleActive(e) {
    // 取出当前点击目标身上的自定义属性索引,
    const { index } = e.currentTarget.dataset; // *这是给tab切换index激活样式用
    // 根据索引取出当前的对应右边列表的数据
    const currentChild = this.cateData[index].children;
    this.setData({
      currentIndex: index,
      currentChild,
      scrollTop: 0
    })
  }

})