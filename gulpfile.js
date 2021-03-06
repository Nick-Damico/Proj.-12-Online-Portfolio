// There are (3) tasks defined within this gulp file:
	// 1. gulp 'clean': Deletes are files folders within /dist directory, CAUTION: you will not be able to rollback this taks!
	// 2. gulp 'image': this optimizes all .jpg, .svg .png images with in the /img directory
	// 3. gulp 'dist': Which concatinates all css, Js, directories into (1) minified file for distribution, optimizes all images.

// After making changes to dist folder use this command to push changes to gh-pages link for live viewing : git subtree push --prefix dist origin gh-pages


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
  imagemin = require('gulp-imagemin'),
  	prefix = require('gulp-autoprefixer');


gulp.task("concatScripts", function () {
	return gulp.src([
		'assets/scripts/lib/node_modules/velocity-animate/velocity.js',
		'assets/scripts/lib/node_modules/velocity-animate/velocity.ui.js',
		'assets/scripts/scripts.js'
		])
		.pipe(maps.init())
		.pipe(concat('app.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task("minifyScripts",['concatScripts'], function () {
	return gulp.src("dist/assets/scripts/app.js")
			   .pipe(uglify())
			   .pipe(rename('app.min.js'))
			   .pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task("prefix", ["concatCSS"], function () {
	return gulp.src(["dist/assets/css/app.css"])
			   .pipe(prefix())
			   .pipe(gulp.dest('dist/assets/css'));
});

gulp.task("concatCSS", function () {
	return gulp.src([
		'assets/css/application.css'
		])
		.pipe(maps.init())
		.pipe(concat('app.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('dist/assets/css'));
});

gulp.task("minifyCss", ["prefix"], function () {
	return gulp.src("dist/assets/css/app.css")
			   .pipe(cssClean())
			   .pipe(rename('app.min.css'))
			   .pipe(gulp.dest('dist/assets/css'));
});

// gulp.task('jpgMin', function () {
// 	return gulp.src('img/photos/photo2.jpg')
// 			   .pipe(imagemin({quality: 'low'}))
// 			   .pipe(gulp.dest('images'));
// });
// //  http://picresize.com/b58a3800a3f27f

gulp.task('image', function () {
  gulp.src(['assets/images/*', 'assets/images/icons/*', 'assets/images/modal-img/*', 'assets/images/project-thumbs/*'], {base: "./"})
    .pipe(image({
      jpegRecompress: true,
      jpegoptim: false,
      mozjpeg: false,
      concurrent: 12}))
    .pipe(gulp.dest('dist'));
});

gulp.task("clean", function () {
	del(['dist']);
});

gulp.task("build-css", ['minifyCss']);

gulp.task("build-images", ['image']);

gulp.task("build", ['minifyCss', 'minifyScripts', 'image']);

gulp.task("dist", ['minifyCss', 'minifyScripts', 'image'], function () {
	return gulp.src(["index.html", "modal.html"])
			   .pipe(gulp.dest('dist'));
});

gulp.task("default", ["build"]);
