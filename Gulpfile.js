var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    del = require('del'),
    jade = require('gulp-jade'),
    data = require('gulp-data');

gulp.task('default', ['build','serve', 'watch']);
gulp.task('build', ['bower','jade','styl','img']);

gulp.task('serve', function() {
    browserSync({
        server: "./dist"
    });
});

gulp.task('bower', function() {
    gulp.src('./bower_components/**')
        .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('watch', function(){
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/styl/*', ['css']);
    gulp.watch('./src/js/*', ['js']);
    gulp.watch(['./dist/index.html','./dist/js/*','./dist/css/*'])
        .on('change', function (file) {
            console.log(file.path, 'has changed');
            browserSync.reload();
        });
});

gulp.task('jade', function() {
    gulp.src('./src/*.jade')
        .pipe(data(function(file) {
            return require('./src/products.json');
        }))
        .pipe(jade())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('styl', function() {
    gulp.src('./src/styl/import.styl')
        .pipe(stylus())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
    gulp.src('./src/js/*')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('img', function() {
    gulp.src('./src/img/**')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('clean', function (cb) {
    del('./dist', cb);
});
