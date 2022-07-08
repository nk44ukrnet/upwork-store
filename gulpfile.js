var gulp = require('gulp');
var cssMin = require('gulp-css');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('css', function(){
    return gulp.src('assets/src/scss/app.css')
        .pipe(concat('app.css'))
        .pipe(rename({suffix:'.min'}))
        .pipe(cssMin())
        .pipe(gulp.dest('assets/src/scss/'))
        .pipe(concat('app.css'))
        .pipe(rename({suffix:'.min'}))
        .pipe(cssMin())
        .pipe(gulp.dest('assets/dist/css/'));
});

gulp.task('js', function (done) {
    setTimeout(async function() {
        gulp.src([
            'assets/src/js/vendor/swiper-bundle.min.js',
            'assets/src/js/app.js'
        ])
            .pipe(concat('app.js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('assets/dist/js/'))
    }, 200)
    setTimeout(async function(){
        gulp.src([
            'assets/src/js/vendor/swiper-bundle.min.js',
            'assets/src/js/app.js'
        ])
            .pipe(concat('app.js'))
            .pipe(rename({suffix:'.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('assets/src/js/'))
    }, 250)
    done();
});

gulp.task('dev', gulp.series('css', 'js'));


