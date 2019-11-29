function axios({ url: oldUrl, data, method, ...rest }) {
    let url = '';
    //? 检测是否有加服务器http 没有就加,有就不加
    if (oldUrl.indexOf('http') > -1) {
        url = oldUrl;
    } else {
        url = 'https://api.zbztb.cn/api/public/v1/' + oldUrl;
    };


    return new Promise((resolv, reject) => {
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
             }
        });

    })


}
export default axios;