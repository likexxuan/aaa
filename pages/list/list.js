// pages/list/list.js
import https from '../../utils/https.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // categories/分类id/shops?_page=页码&_limit=页容量&q=关键字
    id: null, //分类id，将来去加载我们所需要的数据
    _page:0, //页码，一加载页面就++，所以从0开始
    _limit:10, //页容量
    hasMore:true , //是否还有更多
    list:[],
    inputShowed: false,
    inputVal: ""  //关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options 是接收页面传过来的值 id & name
    // console.log(options)  
    this.data.id = options.id,
    //动态设置导航栏的标题内容
    wx.setNavigationBarTitle({
      title: options.name,
    })
    //调用加载数据的方法
    this.loadData()
  },

  //加载第一页的数据
  loadData(){
    //如果没有更多数据了，直接返回
    if(!this.data.hasMore) return
    this.data._page ++
    //发送请求
    const url = `categories/${this.data.id}/shops?_page=${this.data._page}&_limit=${this.data._limit}&inputVal=${this.data.inputVal}`
    https.get(url).then((res)=>{
      // console.log(res)
      //关闭下拉刷新效果
      wx.stopPullDownRefresh()
      
      //拼接每次得到的数据
      const newArray = [...this.data.list,...res.data]

      //获取数据的总条数，在请求头中
      const total = parseInt(res.header['X-Total-Count'])
      this.setData({
        list: newArray,
        // list:res.data
        hasMore: newArray.length < total
      })
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //下拉刷新。所有数据重新渲染
    this.data._page = 0,
    this.setData({
      hasMore:true,
      list:[]
    },()=>{
      //重新加载第一页的数据
      this.loadData()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  //和搜索相关的方法
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  // 获取最终要进行搜索的值
  getLastValue() {
    console.log(this.data.inputVal)
  }
})