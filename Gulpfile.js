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
    var watcher = gulp.watch(['./src/**'], ['copy']);
    watcher.on('change', function (event) {
        console.log(event.path + ' has ' + event.type)
    });
});

gulp.task('default', ['server', 'watch']);