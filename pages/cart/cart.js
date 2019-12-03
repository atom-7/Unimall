import regeneratorRuntime from '../../lib/runtime/runtime';
import { getAddress, getSetting, openSetting } from '../../utils/address';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    productList:[],
    totalPrice:0,
    goods_number:0,
    checkAll:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 
  onShow: function () {
    const list = wx.getStorageSync('cartList') || [];
    this.setData({
      productList:list
    });
    this.calcPrice();
    
  },
  // * 处理获取地址操作
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
  //* 点击复选框的事件
  handleCheck(e){
    const {index} = e.currentTarget.dataset;
    const newarr = this.data.productList;
    newarr[index].ischeck = !newarr[index].ischeck;
    this.setData({
      productList:newarr
    })
    wx.setStorageSync("cartList", newarr);
      
    this.calcPrice();
    
  },
  //* 点击加减的时候
  changeNum(e){
    const {num,index} = e.currentTarget.dataset;
    console.log('num',num,'index',index);
    const newarr = this.data.productList;
    if(newarr[index].number===1 &&num== -1){ // ? 数量1 还点减的情况
       // todo 询问是否想要删除
       wx.showModal({
         title: '您是否要删除该商品',
         content: '',
         showCancel: true,
         cancelText: '取消',
         cancelColor: '#000000',
         confirmText: '确定',
         confirmColor: '#3CC51F',
         success: (result) => {
           if (result.confirm) {
              newarr.splice(index,1);
              console.log(result.confirm);
              this.setData({
                productList:newarr
              })
              wx.setStorageSync("cartList", newarr);
              this.calcPrice();

           }
         }
       });
         
      
    }
    else if(newarr[index].number===newarr[index].goods_number &&num===+1){//? 添加的数量 > 库存
      wx.showToast({
        title: '库存不足',
        icon: 'none',
        duration: 800,
        mask: true,
        success: (result) => {
          
        }
      });
    }else{  // 数量加减正常的情况
      newarr[index].number+=num;
     
    }
    this.setData({
      productList:newarr
    })
    wx.setStorageSync("cartList", newarr);
    this.calcPrice();
   

  },
  //* 点击全选
  handleSelectAll(){
    const {checkAll,productList} = this.data;
    productList.forEach(v=>v.ischeck = !checkAll);
    this.setData({
      checkAll:!checkAll,
      productList
    });
    wx.setStorageSync("cartList", productList);
      
   
    this.calcPrice();
  }




})