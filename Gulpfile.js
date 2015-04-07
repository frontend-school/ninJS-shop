var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat');
    jpg = require('gulp-imagemin');

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('build', ['html', 'css', 'js', 'img', 'bower']);

gulp.task('html', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function () {
    gulp.src(['src/css/blocks/main.styl', 'src/css/blocks/grid.styl', 'src/css/blocks/product-container.styl', 'src/css/blocks/*.styl'])
        .pipe(stylus())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
    gulp.src('src/js/*')
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('img', function () {
    gulp.src('src/img/*')
        .pipe(jpg({progressive: true}))
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('bower', function () {
    gulp.src('bower_components/**')
        .pipe(gulp.dest('dist/vendor/'));
});

gulp.task('watch', function () {
    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/css/**', ['css']);
    gulp.watch('src/js/*', ['js']);
    gulp.watch('src/img/*', ['img']);
    gulp.watch('bower_components/**', ['bower']);
    gulp.watch(['dist/index.html','dist/css/*', 'dist/js/*', 'dist/img/*']).on('change', function (event) {
        console.log(event.path + ' has ' + event.type);
        browserSync.reload();
    });
});

gulp.task('default', ['build', 'server', 'watch']);