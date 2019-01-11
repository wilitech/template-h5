function Loader(imgs, cb) {
  const len = imgs.length
  // let num = 0
  let numLoaded = 0
  const intv = setInterval(() => {
    if (numLoaded >= len) {
      if (cb) {
        cb(100, true)
      }
      return clearInterval(intv)
    } else {
      const percent = Math.floor((numLoaded * 100) / len)
      if (cb) {
        cb(percent, false)
      }
    }
  }, 500)
  imgs.forEach(item => {
    const img = new Image()
    img.onload = e => {
      numLoaded += 1
    }
    img.src = item
  })
}

module.exports = Loader
