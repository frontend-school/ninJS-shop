var gulp = require('gulp');

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

