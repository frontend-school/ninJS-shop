var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	del = require('del');

	/*To run the project - run 'serve' task
	NEED TO FIX
	'scss' task works only either manually or when 'serve' runs second time without 'clean-up'
	*/

gulp.task('html', function(){
	gulp.src(['src/*.html'])
		.pipe(gulp.dest('dist'));
});
gulp.task('scss', function(){
	gulp.src(['src/scss/all.scss'])
		.pipe(sass())
		.pipe(gulp.dest('dist/css'));
});
gulp.task('sass-concat', function() {
	gulp.src(['src/scss/globals/**/variables.scss', 'src/scss/globals/globals.scss', 'src/scss/globals/**/mixins.scss','src/scss/grid/**/*.scss', 'src/scss/blocks/**/*.scss', '!src/scss/all.scss'])
	.pipe(concat('all.scss'))
	.pipe(gulp.dest('src/scss/'));
});
gulp.task('js', function(){
	gulp.src(['src/js/*.js'])
		.pipe(gulp.dest('dist/js'));
});
gulp.task('clean-up', function () {
  del([
  	'dist/**',
  	'src/scss/all.scss'
  ]);
});
gulp.task('html-watch',['html'],browserSync.reload());
gulp.task('scss-watch',['sass-concat'],browserSync.reload());
gulp.task('js-watch',['js'],browserSync.reload());
gulp.task('initialCopy', function(){
	gulp.src(['src/**'])
		.pipe(gulp.dest('dist'));
});
gulp.task('bowerToVendor', function(){
	gulp.src(['bower_components/**'])
		.pipe(gulp.dest('dist/vendor'));
});
gulp.task('serve',['sass-concat', 'scss', 'initialCopy'], function(){
	browserSync({
		server: {
			baseDir: "dist"
		}
	});
	var htmlWatcher = gulp.watch('src/*.html',['html-watch']);
	htmlWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type)
		});
	var scssWatcher = gulp.watch('src/**/*.scss',['scss-watch', 'scss']);
	scssWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type)
		});
	var jsWatcher = gulp.watch('src/**/*.js',['js-watch']);
	jsWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type)
		});
});