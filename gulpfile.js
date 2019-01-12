var gulp = require('gulp');
var copy = require('gulp-copy');
var fontSpider = require('gulp-font-spider');
var qn = require('./qnUpload');
var config = require('./private.config');
var task = [];

gulp.task('copyFontDev', function() {
	return gulp.src('./src/assets/originFont/**')
    .pipe(copy('./src/assets/font/', {prefix: 3}))
});

gulp.task('copyFontProd', function() {
	return gulp.src('./dist/fonts/**')
    .pipe(copy('./src/assets/font/', {prefix: 2}))
});

gulp.task('qnUpload', function () {
  return gulp.src('./dist/**')
    .pipe(qn({
      qiniu: {
        accessKey: config.qiniu.ACCESS_KEY,
        secretKey: config.qiniu.SECRET_KEY,
        bucket: config.qiniu.bucket,
        origin: config.qiniu.origin
      },
      prefix: config.qiniu.publicPrefix
    }));
});

gulp.task('fontSpider', function() {
	return gulp.src('./dist/*.html')
		.pipe(fontSpider());
});

if (config.useQiniu) {
  task.push('qnUpload');
}

gulp.task('default', task);