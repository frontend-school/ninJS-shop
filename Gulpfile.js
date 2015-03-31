var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});


gulp.task('copy', function () {
    gulp.src('./src/**')
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}));
});

gulp.task('bower', function () {
    gulp.src('./bower_components/**')
        .pipe(gulp.dest('./dist/vendor/'));
});


gulp.task('watch', function () {
    gulp.watch(['./src/**'], ['copy']);
});



gulp.task('default', ['server', 'watch']);



//gulp.task('default', function() {
 //   // place code for your default task here
//});