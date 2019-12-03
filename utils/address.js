export const getAddress = function () {  
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
                console.log(result);
                
            },
        });
    })
}
export const getSetting = function () {  
   return new Promise((resolve,reject)=>{
          wx.getSetting({
              success: (res) => {
                  resolve(res.authSetting["scope.address"]);
              }
          });
            
     });
    
    
}
export const openSetting = function ( ) { 
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (res) => {
                resolve(res) 
            },
           
        });
          
    })

 }
  