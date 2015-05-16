var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    brfs = require('gulp-brfs'),

    paths = {
        src: {
            root: './src',
            html_index: './src/index.html',
            html_blocks: './src/html/*.html',
            styl: './src/styl/**',
            styl_main: './src/styl/main.styl',
            js: './src/js/**',
            js_app: './src/js/app.js',
            img: './src/img/**',
            bower: './bower_components/**',
            data: './src/data/**'
        },
        dist: {
            root: './dist',
            css: './dist/css',
            js: './dist/js',
            img: './dist/img',
            vendor: './dist/vendor',
            data: './dist/data'
        }
    };

gulp.task('default', ['build','serve', 'watch']);
gulp.task('build', [/*'clean',*/'bower','data','html','styl','img','js','hint']);


gulp.task('bower', function() {
    gulp.src(paths.src.bower)
        .pipe(gulp.dest(paths.dist.vendor));
});

gulp.task('data', function() {
    gulp.src(paths.src.data)
        .pipe(gulp.dest(paths.dist.data));
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

gulp.task('hint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js', function() {
    browserify(paths.src.js_app)
        .bundle()
        .pipe(source('app.js'))
        .pipe(brfs())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('img', function() {
    gulp.src(paths.src.img)
        .pipe(gulp.dest(paths.dist.img));
});

gulp.task('serve', ['bower', 'html', 'styl', 'js', 'hint', 'img'], function() {
    browserSync({
        server: paths.dist.root
    });
});

gulp.task('watch', function(){
    gulp.watch(paths.src.html_blocks, ['html']);
    gulp.watch(paths.src.html_index, ['html']);
    gulp.watch(paths.src.styl, ['styl']);
    gulp.watch(paths.src.img, ['img']);
    gulp.watch(paths.src.js, ['js', 'hint']);
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