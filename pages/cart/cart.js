import regeneratorRuntime from '../../lib/runtime/runtime';
import { getAddress, getSetting, openSetting } from '../../utils/address';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  async handleAddress() {
    //* 判断有没有添加过地址, 
    let isChoose = await getSetting(); 
    // * 拒绝过旧永远都为false,就要opensetting去设置
    if (isChoose === false) await openSetting();
    // *拿到地址值
    const address= await getAddress();
    this.setData({
      address
    });
    

  }



})