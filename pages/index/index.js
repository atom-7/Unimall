//index.js
//获取应用实例
import axios from '../../request/axios';
const app = getApp()

//Page Object
Page({
    data: {
        swiperList: [],
        categoryNav: [],
        floorList: []
    },
    onLoad: function (options) {
        this.getSwiper();
        this.getCategory();
        this.getFloor();
    },
    // 获取轮播图
    getSwiper() {
        this.axios({
            url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',

        })
        .then((res) => {
            const { message } = res.data;
            console.log(message);
            this.setData({
                swiperList: message
            })

        })
    },
    axios,
    // 获取首页分页按钮
    getCategory() {
        this.axios({
            url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
           
        })
        .then((res)=>{
            const { message } = res.data;
            console.log(message);
            this.setData({
                categoryNav: message
            })
        
        })
    },
    // 获取首页 楼层数据
    getFloor() {
        this.axios({
            url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
        }).then((res)=>{  
           const { message } = res.data;
            console.log(message);
            this.setData({
                floorList: message
            })
        })

    },
    fixUrl(url) {

        let newurl = '';
        let arr = ['pages/index/index', 'pages/category/index'];
        if (arr.indexOf(url) > -1) {
            newurl = url;
        } else {
            // if(url.lastIndexOf('/index')>-1){
            // }
            let str = url.slice(7, url.lastIndexOf('/'));
            newurl = url.replace(/index/g, str);


        }
        return newurl;
    },


});
