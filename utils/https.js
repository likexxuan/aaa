const urlBase = "https://locally.uieee.com/"
// 封装get 方法
// const get = function(url){}
const get = url => {
  return new Promise((resolve, reject) => {
    //执行异步操作
    wx.request({
      url: `${urlBase}${url}`,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

//封装post 方法
const post = (url, data) => {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${urlBase}${url}`,
      method: 'POST',
      data,
      success: err => {
        resolve(res)
      },
      fail: res => {
        reject(err)
      }
    })
  })
}

export default {
  get,
  post
}