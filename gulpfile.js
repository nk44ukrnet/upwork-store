var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssmin = require('gulp-css');
var rename = require('gulp-rename');

var localFiles = ['./assets/dist/**/*'];
gulp.task('sass', function() {
	gulp.src([
		'assets/src/scss/app.scss'
	])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('assets/src/css'))
});

gulp.task('css', ['sass'], function() {
	setTimeout(function(){
		gulp.src([
			'assets/src/css/app.css'
		])
			.pipe(concat('app.css'))
			.pipe(rename({suffix:'.min'}))
			.pipe(cssmin())
			.pipe(gulp.dest('assets/dist/css'))
	}, 200)
});

gulp.task('js', function() {
	setTimeout(function(){
		gulp.src([
			'assets/src/js/vendor/lazyload.js',
			'assets/src/js/app.js'
		])
			.pipe(concat('app.js'))
			.pipe(rename({suffix:'.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('assets/dist/js/'))
	}, 200)
	setTimeout(function(){
		gulp.src([
			'assets/src/js/courses.js'
		])
			.pipe(concat('courses.js'))
			.pipe(rename({suffix:'.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('assets/dist/js/'))
	}, 250)
});

gulp.task('default', ['sass', 'css', 'js']);

gulp.task('watch', function() {
	gulp.watch('assets/src/scss/**/*.scss', ['css'])
	gulp.watch('assets/src/js/*.js', ['js'])
});
