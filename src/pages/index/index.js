import $ from '@/assets/js/zepto'
import iSlider from '@/assets/js/islider'
import Toast from '@/assets/js/toast'
import Loader from '@/assets/js/loader'
import Wx from '@/assets/js/wx'
import domtoimage from 'dom-to-image'
import QRCode from 'qrcode'
import { preloads } from './data'
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
  resulteGenerated: false,
  iSlider: null,
  init() {
    this.iSlider = new iSlider({
      wrap: '.wrapper',
      item: 'section',
      noslide: [...Array(3).keys()],
      lastLocate: false
    })
    this.loading()
    // $bgm.play()
    // document.addEventListener(
    //   'WeixinJSBridgeReady',
    //   function() {
    //     $bgm.play()
    //   },
    //   false
    // )
    // Wx.init({
    //   getParamUrl: Config.prod
    //     ? 'http://xxx.com.cn/client/wx/getJsapiTicket'
    //     : '/wx/getJsapiTicket',
    //   shareObj: shareObj
    // })
  },
  initEvent() {},
  loading() {
    Loader(preloads, (percent, isFinish) => {
      let $percent = $('.progress'),
        $bar = $('.bar-active')
      if (!isFinish) {
        $bar.animate({ width: percent + '%' }, 500)
        $percent.html(percent + '%')
      } else {
        $bar.animate({ width: '100%' }, 500)
        $percent.html('已完成')
        this.loaded = true
        this.loadPage('load-result')
      }
    })
  },
  loadPage(page, isPre) {
    console.log('loadpage', page, this.currentPage)
    isPre ? this.iSlider.prev() : this.iSlider.next()
    // do something
    this.currentPage = page
    switch (page) {
      case 'loading':
        this.loaded ? this.loadPage('load-result') : this.loading()
        break
      case 'load-result':
        this.resulteGenerated
          ? this.loadPage('result')
          : setTimeout(() => {
              this.generateQrcode()
            }, 1000)
        break
      case 'result':
        break
      default:
        break
    }
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
    const node = document.getElementById('resultNode')
    domtoimage
      .toPng(node)
      .then(dataUrl => {
        let img = new Image()
        img.src = dataUrl
        img.classList = ['screenshot']
        node.style.display = 'none'
        $('.mask.front').hide()
        node.parentNode.appendChild(img)
        this.resulteGenerated = true
        this.loadPage('result')
      })
      .catch(function(error) {
        console.error('oops, something went wrong!', error)
      })
  }
}
app.init()
