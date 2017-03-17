"use strict";
// Add require for
  var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
  cssClean = require('gulp-clean-css'),
    rename = require('gulp-rename'),
      maps = require('gulp-sourcemaps'),
       del = require('del'),
     image = require('gulp-image'),
  imagemin = require('gulp-imagemin');


gulp.task("concatScripts", function () {
	return gulp.src([
		'assets/scripts/lib/node_modules/velocity-animate/velocity.js',
		'assets/scripts/lib/node_modules/velocity-animate/velocity.ui.js',
		'assets/scripts/app.js'
		])
		.pipe(maps.init())
		.pipe(concat('scripts.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('js'));
});

gulp.task("minifyScripts",['concatScripts'], function () {
	return gulp.src("assets/scripts/scripts.js")
			   .pipe(uglify())
			   .pipe(rename('app.min.js'))
			   .pipe(gulp.dest('scripts'));
});

gulp.task("concatCSS", function () {
	return gulp.src([
		'assets/css/.css'
		])
		.pipe(maps.init())
		.pipe(concat('app.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'));
});

gulp.task("minifyCss", ["concatCSS"], function () {
	return gulp.src("assets/css/app.css")
			   .pipe(cssClean())
			   .pipe(rename('app.min.css'))
			   .pipe(gulp.dest('css'));
});

// gulp.task('jpgMin', function () {
// 	return gulp.src('img/photos/photo2.jpg')
// 			   .pipe(imagemin({quality: 'low'}))
// 			   .pipe(gulp.dest('images'));
// });
// //  http://picresize.com/b58a3800a3f27f 
 
gulp.task('image', function () {
  gulp.src(['assets/images', 'assets/images/icons', 'assets/images/modal-img', 'assets/images/project-thumbs'],'.')
    .pipe(image({
      jpegRecompress: true,
      jpegoptim: false,
      mozjpeg: false,
      concurrent: 12}))
    .pipe(gulp.dest('js', build));
});

gulp.task("clean", function () {
	del(['dist', 'css/app*.css*', 'scripts/app*.js*']);
});
gulp.task("build", ['minifyCss', 'minifyScripts', 'image']);

gulp.task("dist", ['minifyCss', 'minifyScripts', 'image'], function () {
	return gulp.src(["assets/css/app.min.css", "assets/scripts/app.min.js", "index.html", "modal.html", "assets/img/**"], { base: './'})
			   .pipe(gulp.dest('dist'));
});

gulp.task("default", ["build"]);



 pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10
