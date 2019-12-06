/**
 * 用于执行小程序登录
 * 登录后返回code
 */
export const login = function () {
    return new Promise((resolve, reject) => {
        wx.login({
            success: (res) => {
                resolve(res.code)
            }
        });
    })


};

/**
 * 发起微信支付接口
 */
export const requestPayment = function (data) {  
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...data,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err);
            },
            
        });
          
    })
}