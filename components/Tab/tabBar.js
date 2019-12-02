// components/Tab/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabNameList: {
      type: Array,
      value: ''
    },
    showIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleIndex(e){
      const showIndex = e.currentTarget.dataset.index;      
      this.setData({
        showIndex
      })
      this.triggerEvent('getIndex',{index:showIndex});
    }
  }
})
