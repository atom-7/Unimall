//index.js
//获取应用实例
const app = getApp()

//Page Object
Page({
    data: {
        swiperList: [],
        categoryNav: []
    },
    onLoad: function (options) {
        this.getSwiper();
        this.getCategory();
        this.getFloor();
    },
    // 获取轮播图
    getSwiper() {
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
            success: (res) => {
                const { message } = res.data;
                console.log(message);
                this.setData({
                    swiperList: message
                })
            }
        });
    },
    // 获取首页分页按钮
    getCategory() {
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
            success: (res) => {
                const { message } = res.data;
                console.log(message);
                this.setData({
                    categoryNav: message
                })
            }
        });
    },
    // 获取首页 楼层数据
    getFloor() {
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
            success: (res) => {
                console.log(res);

            }
        });

    }


});
