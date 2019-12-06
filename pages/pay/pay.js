import regeneratorRuntime from '../../lib/runtime/runtime';
import axios from '../../request/axios';
import {login,requestPayment} from '../../utils/pay';
Page({

  /**
   * 页面的初始数据
   * 
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
    this.setData({
      address
    })
  },
 
  onShow: function () {
    // this.handleAddress();
    const list = wx.getStorageSync('cartList') || [];
    this.setData({
      productList:list.filter(v=>v.ischeck)
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
  async goToPay(e){

   // todo  这里是获取用户信息
   const {encryptedData,rawData,signature,iv}= e.detail;

   // todo 这里是获悉用户的登录微信返回的code
   const code=await login();
   
  //todo  发请求获取token
   const token= await axios({url:'https://api.zbztb.cn/api/public/v1/users/wxlogin',method:'post',data:{encryptedData,rawData,signature,iv,code}
    }).then((res)=> res.data.message.token);

   //todo 创建后台订单单号
  const order= await axios({
     url:'https://api.zbztb.cn/api/public/v1/my/orders/create',
     method:'post',
     header:{Authorization:token},
     data:{
      order_price:this.data.totalPrice,
      consignee_addr:this.data.address.cityName,
      goods:this.data.productList
     }
   }).then((res)=>res.data.message.order_number);
  
   //todo 通过订单单号去获取微信支付接口的参数

    const payData =await axios({
      url:'https://api.zbztb.cn/api/public/v1/my/orders/req_unifiedorder',
      method:'post',
      header:{Authorization:token},
      data:{order_number:order}
    }).then((res)=>res.data.message.pay);
    
   
   //todo 真正的发起支付
   const payed=await requestPayment(payData);

    //todo 查询订单
  const isPayed = await axios({
     url:'https://api.zbztb.cn/api/public/v1/my/orders/chkOrder',
     method:'post',
     header:{Authorization:token},
     data:{order_number:order}
   }).then((res)=>res.data.message);
   
   // todo 提示用户支付成功或失败
     wx.showToast({
       title:isPayed,
       icon: 'none',
       duration: 1200,
       mask: true,
   })
    const newarr = this.data.productList.filter(v=>!v.ischeck);
   
    this.setData({
      productList:newarr
    });
    wx.setStorageSync("cartList", newarr);
      
   
    
      
  },

})