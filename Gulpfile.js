var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),

    paths = {
        src: {
            root: './src',
            html_index: './src/index.html',
            html_blocks: './src/html/*.html',
            styl: './src/styl/**',
            styl_main: './src/styl/main.styl',
            js: './src/js/*.js',
            img: './src/img/**',
            bower: './bower_components/**'
        },
        dist: {
            root: './dist',
            css: './dist/css',
            js: './dist/js',
            img: './dist/img',
            vendor: './dist/vendor'
        }
    };

gulp.task('default', ['build','serve', 'watch']);
gulp.task('build', ['clean','bower','html','styl','img','js']);

gulp.task('bower', function() {
    gulp.src(paths.src.bower)
        .pipe(gulp.dest(paths.dist.vendor));
});

gulp.task('html', function() {
    gulp.src([paths.src.html_index])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.dist.root));
});

gulp.task('styl', function() {
    gulp.src(paths.src.styl_main)
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(concat('styles.css'))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('js', function() {
    gulp.src(paths.src.js)
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('img', function() {
    gulp.src(paths.src.img)
        .pipe(gulp.dest(paths.dist.img));
});

gulp.task('serve', ['bower', 'html', 'styl', 'img'], function() {
    browserSync({
        server: paths.dist.root
    });
});

gulp.task('watch', function(){
    gulp.watch(paths.src.html_blocks, ['html']);
    gulp.watch(paths.src.html_index, ['html']);
    gulp.watch(paths.src.styl, ['styl']);
    gulp.watch(paths.src.img, ['img']);
    gulp.watch(paths.src.js, ['js']);
    gulp.watch([paths.src.html_blocks, paths.src.html_index, paths.src.img, paths.src.styl, paths.src.js])
        .on('change', function (file) {
            console.log(file.path, 'has changed');
            setTimeout(function(){
                browserSync.reload();
            }, 100);
        });
});

gulp.task('clean', function (cb) {
    del.sync(paths.dist.root, cb);
});