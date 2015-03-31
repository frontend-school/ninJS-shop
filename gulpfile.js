var gulp = require('gulp');
var browserSync = require('browser-sync');



// default task
gulp.task('default', ['browser-sync']);

// Browser reload
gulp.task('browser-sync',['watch'], function() {
    browserSync.init(['./dist/index.html'], {
        server: {
            baseDir: "./dist"
        }
    });
});

/*------Watchers ------*/

// General watchers
gulp.task('watch',['watchIndex','watchCSS','watchJS']);

// Watch index.html
gulp.task('watchIndex',function(){
    var watcher = gulp.watch('./src/index.html', ['buildhtml']);
    watcher.on('change', function (event) {
        console.log(event.path + ' has ' + event.type); // added, changed, or deleted

    });
});

// Watch CSS
gulp.task('watchCSS',function(){
    var watcher = gulp.watch('./src/css/*.css', ['buildcss']);
    watcher.on('change', function (event) {
        console.log(event.path + ' has ' + event.type); // added, changed, or deleted

    });
});

// Watch javascript
gulp.task('watchJS',function(){
    var watcher = gulp.watch('./src/js/*.js', ['buildjs']);
    watcher.on('change', function (event) {
        console.log(event.path + ' has ' + event.type); // added, changed, or deleted

    });
});

/*------Building ------*/
//Build project
gulp.task('build',['buildjs','buildhtml','buildcss','buildimage']);

//Build vendor libs
gulp.task('buildvendor',function(){
    var vendorSrc = './bower_components/**/dist/*.min.js',
        vendorDst = './dist/vendor/';

    gulp.src(vendorSrc)
        .pipe(gulp.dest(vendorDst));
});

//build js file
//Now it just copy
gulp.task('buildjs', function() {
    var jsSrc = './src/js/*',
        jsDst = './dist/js/';

    gulp.src(jsSrc)
        .pipe(gulp.dest(jsDst));
});

//build html file
//Now it just copy
gulp.task('buildhtml', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst));
});

//build css file
//Now it just copy
gulp.task('buildcss', function(){
    var cssSrc = './src/css/*.css',
        cssDst = './dist/css/';
    gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./dist/css/'))
});

//build image file
//Now it just copy
gulp.task('buildimage', function() {
    var imgSrc = './src/img/*',
        imgDst = './dist/img/*';

    gulp.src(imgSrc)
        .pipe(gulp.dest(imgDst));
});



