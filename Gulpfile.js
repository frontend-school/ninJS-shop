var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function() {
    browserSync({
        server: "./dist"
    });
});

gulp.task('build', function() {
    gulp.src('./src/**')
        .pipe(gulp.dest('./dist'));
});

gulp.task('bower', function() {
    gulp.src('./bower_components/**')
        .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('default', ['serve']);
