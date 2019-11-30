// pages/goods_list/goods_list.js
import axios from '../../request/axios';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterList: ['综合', '销量', '价格'],// tab栏的文字
    showIndex: 0,// tab栏切换的inedx
    pageIndex: 0,// 获取数据的页码
    productList: [],// 搜索获取回来的商品列表数据
    total: 0,
    // * 404图片路径
    miss: 'https://www.webdesignerdepot.com/cdn-origin/uploads/2017/05/featured_404.jpg',

  },
  axios,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const { query, cid } = options;
    this.setData({
      query,
      cid
    })
    this.getSearchList();
  },
  // 处理点击过滤的事件
  handleIndex(e) {

    const { index } = e.currentTarget.dataset;
    this.setData({
      showIndex: index
    })
  },
  // 获取搜索的列表
  getSearchList() {
    //? 获取最大页数, 如果当前页码已经是最大页码,就return
    let max = Math.ceil(this.data.total / 10);

    // * 判断当前页数
    if (this.data.pageIndex === max && this.data.pageIndex) return;

    this.setData({  // *修改页码
      pageIndex: this.data.pageIndex + 1
    })
    const { query, cid } = this.data;
    console.log(this.data.pageIndex);
    this.axios({
      url: 'https://api.zbztb.cn/api/public/v1/goods/search',
      data: {
        query,
        cid,
        pagenum: this.data.pageIndex,
        pagesize: 10
      },
    })
      .then((res) => {
        console.log(res);
        const { goods, total } = res.data.message;
        const oldArr = this.data.productList;
        this.setData({
          ['productList']: [...oldArr, ...goods],
          total
        })
        console.log(this.data.productList);
      })
    // wx.request({


    //   success: (res) => {


    //   }
    // });

  },
  handleGetBottom() {
    this.getSearchList();
  },
  onReachBottom() {
    console.log('onReachBottom');
    this.getSearchList();
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh');

  }

})