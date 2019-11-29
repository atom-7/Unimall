// pages/goods_detail/goods_detail.js
import axios from '../../request/axios';
Page({
  data: {
    productDetail:{}
  },
  axios,
  onLoad: function ({goods_id}) {
    
     this.axios({
       url:'goods/detail',
       data:{
        goods_id
       }
     }).then((res)=>{
       console.log(res);
       const{message} = res.data;
       this.setData({
        productDetail:message
       })

     })
  }
})