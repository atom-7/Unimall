// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      filterList:['综合','销量','价格'],// tab栏的文字
      showIndex:0,// tab栏切换的inedx
      pageIndex:0,// 获取数据的页码
      productList:[],// 搜索获取回来的商品列表数据
      total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const {query,cid} = options;
    this.setData({
      query,
      cid
    })
    this.getSearchList();
  },
  // 处理点击过滤的事件
  handleIndex(e){
 
    const {index} = e.currentTarget.dataset;
    this.setData({
      showIndex:index
    })
  },
  // 获取搜索的列表
  getSearchList(){
    let max =Math.ceil(this.data.total/10);
     if(this.data.pageIndex === max && this.data.pageIndex)return;
       this.setData({
         pageIndex:this.data.pageIndex+1
       })
       const {query,cid} = this.data;
       console.log(this.data.pageIndex);
      wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/goods/search',
        data: {
          query,
          cid,
          pagenum:this.data.pageIndex,
          pagesize:10
        },
        success: (res) => {
          console.log(res);
          const{goods,total} = res.data.message;
          const oldArr = this.data.productList;
          this.setData({
            ['productList']:[...oldArr,...goods],
            total
          })
          console.log(this.data.productList);
          
        }
      });
        
  },
  handleGetBottom(){
    this.getSearchList();
  },
  onReachBottom(){
    console.log('onReachBottom');
    this.getSearchList();
  },
  onPullDownRefresh(){
    console.log('onPullDownRefresh');
    
  }

})