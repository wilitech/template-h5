var gulp = require( 'gulp' );
var fontSpider = require( 'gulp-font-spider' );
	
gulp.task('fontspider', function() {
	return gulp.src('./dist/*.html')
		.pipe(fontSpider());
});

gulp.task('default', ['fontspider']);