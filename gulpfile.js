var gulp = require('gulp'),
	browserSync = require('browser-sync');
	
	gulp.task('html', function(){
		gulp.src(['src/*.html'])
			.pipe(gulp.dest('dist'));
	});
	
	gulp.task('css', function(){
		gulp.src(['src/css/*.css'])
			.pipe(gulp.dest('dist/css'));
	});
	
	gulp.task('js', function(){
		gulp.src(['src/js/*.js'])
			.pipe(gulp.dest('dist/js'));
	});
	
	gulp.task('html-watch',['html'],browserSync.reload);
	gulp.task('css-watch',['css'],browserSync.reload);
	gulp.task('js-watch',['js'],browserSync.reload);
	
	gulp.task('initialCopy', function(){
		gulp.src(['src/**'])
			.pipe(gulp.dest('dist'));
	});
	
	gulp.task('bowerToVendor', function(){
		gulp.src(['bower_components/**'])
			.pipe(gulp.dest('dist/vendor'));
	});
	
	gulp.task('serve',['initialCopy'], function(){
		browserSync({
			server: {
				baseDir: "dist"
			}
		});
		
		var htmlWatcher = gulp.watch('src/*.html',['html-watch']);
		htmlWatcher.on('change', function(event) {
			console.log('File ' + event.path + ' was ' + event.type)
			});
		var cssWatcher = gulp.watch('src/**/*.css',['css-watch']);
		cssWatcher.on('change', function(event) {
			console.log('File ' + event.path + ' was ' + event.type)
			});
		var jsWatcher = gulp.watch('src/**/*.js',['js-watch']);
		jsWatcher.on('change', function(event) {
			console.log('File ' + event.path + ' was ' + event.type)
			});
		
	});