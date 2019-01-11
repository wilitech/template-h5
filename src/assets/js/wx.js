import $ from './zepto'
import Tools from './tools'
import wx from 'weixin-js-sdk'

export default {
  params: {},
  init({ getParamUrl = '', shareObj = {} }) {
    if (Tools.isEmpty(this.params)) {
      $.ajax({
        type: 'POST',
        url: getParamUrl,
        dataType: 'json',
        data: { url: location.href },
        timeout: 30 * 1000,
        success: data => {
          data = data.data
          wx.config({
            debug: false,
            appId: data.appId, // 微信的appid需要在公众平台生成
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo'
            ]
          })
          this.params = data
          this.setShare(shareObj)
        },
        error: function(xhr, type) {
          console.error('分享参数获取失败')
        }
      })
    } else {
      this.setShare(shareObj)
    }
  },
  setShare(shareObj) {
    wx.ready(() => {
      wx.onMenuShareTimeline(shareObj)
      wx.onMenuShareAppMessage(shareObj)
      wx.onMenuShareWeibo(shareObj)
      wx.onMenuShareQQ(shareObj)
    })
  }
}
