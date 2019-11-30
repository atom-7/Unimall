function axios({ url: oldUrl, data, method, ...rest }) {
    let url = '';
    //? 检测是否有加服务器http 没有就加,有就不加
    if (oldUrl.indexOf('http') > -1) {
        url = oldUrl;
    } else {
        url = 'https://api.zbztb.cn/api/public/v1/' + oldUrl;
    };
    let count = 0;

    return new Promise((resolv, reject) => {
        count++;
        wx.showLoading({
            title: '加载中',
            mask:true
          })
        wx.request({
            url,
            data: data || "", // ? 没有data就空
            method: method || 'GET', //?不传 默认get
            ...rest,
            success: (result) => {
               
                resolv(result);
            },
            fail: (err) => {
                reject(err);
             },
             complete(){ // *不管请求成功与否都会执行的函数
                count--;
                if(count===0){
                    wx.hideLoading();
                }
             }
        });

    })


}
export default axios;