// pages/goods_detail/goods_detail.js
import axios from '../../request/axios';
Page({
  data: {
    productDetail:{}
  },
  imgList:[],// * 预览图片的路径列表
  axios, // * 请求方法
  onLoad: function ({goods_id}) {
    
     this.axios({
       url:'goods/detail',
       data:{
        goods_id
       }
     }).then((res)=>{
       const{message} = res.data;
       // 这是给预览用的
       this.imgList = message.pics.map(v=>v.pics_big);
       // 这是设置商品的全部数据
       this.setData({
        productDetail:message
       })

     })
  },
  //* 处理点击图片预览事件
  handlePreview(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: this.imgList // 需要预览的图片http链接列表
    })
  },
  // *处理添加到本地数据
  AddToCart(e){
    const data=this.data.productDetail;
     data["ischeck"]=true;
    const cartList= wx.getStorageSync("cartList") || [];
    const index=cartList.findIndex(v=> v.goods_id ===data.goods_id);
    if(index>-1){
      cartList[index].number+=1;
    }else{
      data.number = 1;
      cartList.push(data);
    };
    wx.setStorageSync("cartList", cartList);
    wx.showToast({
      title: '添加成功',
      duration: 500,
      mask: true,
      success: (result) => {
        
      }
    });
      
      
      
  }
})