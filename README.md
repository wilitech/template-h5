## H5 多页模板

* webpack4
* vw适配布局
* zepto 封装
* 中文字体抽取
  * 不支持 javascript 动态插入的元素与样式
  * otf 字体需要转换成 .ttf 格式才能被压缩
  * 仅支持 utf-8 编码的 HTML 与 CSS 文件
  * CSS content 仅支持 `content: 'prefix'` 和 `content: attr(value)` 这两种形式
* 微信分享集成
* HTML 转图片
* QRCode 自动生成

```bash
# 开始
npm install
npm run dev
# 打包
npm run build 
```