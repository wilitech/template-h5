import $ from '@/assets/js/zepto'
import iSlider from '@/assets/js/islider'
import Toast from '@/assets/js/toast'
import Loader from '@/assets/js/loader'
import Wx from '@/assets/js/wx'
import domtoimage from 'dom-to-image'
import QRCode from 'qrcode'
import Config from '../../../private.config'
import './index.scss'

const shareImg = 'http://xxx.com.cn/static/share_icon.jpeg'
const shareObj = {
  title: '标题', // 分享标题
  desc: `描述`, // 分享描述
  link: location.href, // 分享链接
  imgUrl: shareImg // 分享图标
}
const $bgm = $('#bgm').get(0)

const app = {
  loaded: false,
  iSlider: null,
  init() {
    this.generateQrcode()
    // $bgm.play()
    // document.addEventListener(
    //   'WeixinJSBridgeReady',
    //   function() {
    //     $bgm.play()
    //   },
    //   false
    // )
    // this.loading()
    // Wx.init({
    //   getParamUrl: Config.prod
    //     ? 'http://xxx.com.cn/client/wx/getJsapiTicket'
    //     : '/wx/getJsapiTicket',
    //   shareObj: shareObj
    // })
  },
  generateQrcode() {
    QRCode.toDataURL(
      'https://baidu.com',
      { errorCorrectionLevel: 'H' },
      (err, url) => {
        $('#qrcode').attr('src', url)
        this.html2Png()
      }
    )
  },
  html2Png() {
    const node = document.getElementById('htmlNode')
    domtoimage
      .toPng(node)
      .then(function(dataUrl) {
        let img = new Image()
        img.src = dataUrl
        img.classList = ['screenshot']
        node.style.display = 'none'
        $('.mask.front').hide()
        node.parentNode.appendChild(img)
      })
      .catch(function(error) {
        console.error('oops, something went wrong!', error)
      })
  },
  loading() {
    Loader(preloads, (percent, isFinish) => {
      // let $percent = $('.progress'),
      //   $bar = $('.bar-active')
      // if (!isFinish) {
      //   $bar.animate({ width: percent + '%' }, 500)
      //   $percent.html(percent + '%')
      // } else {
      //   $bar.animate({ width: '100%' }, 500)
      //   $percent.html('已完成')
      //   this.loaded = true
      //   this.currentPage == 'loading' && this.loadPage('q' + Quiz.picks[0])
      // }
    })
  },
  initEvent() {}
}
app.init()
