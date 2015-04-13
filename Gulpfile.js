var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    del = require('del'),
    jade = require('gulp-jade'),
    data = require('gulp-data'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),

    paths = {
        src: {
            root: './src',
            jade_main: './src/index.jade',
            jade: './src/{*,includes/*}',
            json: './src/main-data.json',
            styl: './src/styl/**',
            styl_main: './src/styl/main.styl',
            js: './src/js/*.js',
            img: './src/img/**',
            bower: './bower_components/**'
        },
        dist: {
            root: './dist',
            html: './dist/index.html',
            css: './dist/css',
            js: './dist/js',
            img: './dist/img',
            vendor: './dist/vendor'
        }
    };

gulp.task('default', ['build','serve', 'watch']);
gulp.task('build', ['clean','bower','jade','styl','img','js']);

gulp.task('bower', function() {
    gulp.src(paths.src.bower)
        .pipe(gulp.dest(paths.dist.vendor));
});

gulp.task('jade', function() {
    gulp.src(paths.src.jade_main)
        .pipe(data(function() {
            return require(paths.src.json);
        }))
        .pipe(jade())
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

gulp.task('styl-no-sourcemap', function() {
    gulp.src(paths.src.styl_main)
        .pipe(stylus())
        .pipe(concat('styles.css'))
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

gulp.task('serve', ['bower', 'jade', 'styl', 'img'], function() {
    browserSync(['./build/**/**.**'],{
        server: paths.dist.root
    });
});

gulp.task('watch', function(){
    gulp.watch(paths.src.jade, ['jade']);
    gulp.watch(paths.src.styl, ['styl']);
    gulp.watch(paths.src.js, ['js']);
    gulp.watch([paths.src.jade, paths.src.styl, paths.src.js])
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