require('zepto')
require('./fx')
require('./queue')
require('./extras')
window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)
module.exports = $
