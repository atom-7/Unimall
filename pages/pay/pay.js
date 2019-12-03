import regeneratorRuntime from '../../lib/runtime/runtime';
import axios from '../../request/axios';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    productList:[],
    totalPrice:0,
    goods_number:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.handleAddress()
    const address = wx.getStorageSync("address");
    console.log(address);
    
    this.setData({
      address
    })
  },
 
  onShow: function () {
    // this.handleAddress();
    const list = wx.getStorageSync('cartList') || [];
    this.setData({
      productList:list
    });
    this.calcPrice();

    
  },
 
  //* 计算价格
  calcPrice(){
    let goods_number = 0;
    let  checkAll = true;
    // todo 计算商品的总价  总价 + (数量 * 单价)
    const total= this.data.productList.reduce((last,current)=>{
      if(current.ischeck){ // *这里计算的是被选中的
         goods_number+=1;
         
        return last + (+current.number * +current.goods_price)
      }else{
        checkAll = false;
      }
      return last+0 // ! 如果没有被选中就是 上一项+0
    
     // last 是上一次循环中计算出来的值
    },0);
    this.setData({
      totalPrice:total,
      goods_number,
      checkAll
    })
  },
  
  //* 支付结算
  goToPay(){
    
    
  }
})