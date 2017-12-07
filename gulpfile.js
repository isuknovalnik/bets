var gulp = require("gulp");
var plumber = require('gulp-plumber');
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");

var server = require("browser-sync");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var image = require("gulp-image");
var del = require("del");
var run = require("run-sequence");

var jsmin = require('gulp-jsmin');
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var inject = require('gulp-inject');

function fileContents (filePath, file) {
	return file.contents.toString();
}

gulp.task("styles", function() {
	gulp.src("source/styles/style.scss")
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({browsers: [
				"last 1 version",
				"last 2 Chrome versions",
				"last 2 Firefox versions",
				"last 2 Opera versions",
				"last 2 Edge versions"
			]}),
			mqpacker({
				sort: true
			})
		]))
		.pipe(gulp.dest("build/styles"))
		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("build/styles"))
		.pipe(server.reload({stream: true}));
});

gulp.task("jscript", function () {
	gulp.src("source/scripts/*.js")
		.pipe(plumber())
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest("build/scripts/"))
		.pipe(server.reload({stream: true}));
});

gulp.task("serve", function() {
	server.init({
		server: "build",
		open: false
	});
	gulp.watch("source/{styles,blocks}/**/*.scss", ["styles"]);
	gulp.watch("source/*.html", ["copyhtml"]);
	gulp.watch("source/scripts/**/*.js", ["jscript"]);
});

gulp.task("images", function() {
	gulp.src("build/images/**/*.{png,jpg,gif}")
		.pipe(image({
			jpegRecompress: true,
			jpegoptim: false,
			mozjpeg: false
		}))
		.pipe(gulp.dest("build/images"));
});

gulp.task("symbols", function() {
	var svgs = gulp
		.src("source/icons/*.svg")
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename("symbols.svg"))
		.pipe(gulp.dest("source/icons"));
	
	return gulp
		.src('build/*.html')
		.pipe(inject(svgs, { transform: fileContents }))
		.pipe(gulp.dest('build'));
});

gulp.task("svginject", function() {
	var sprite = gulp.src('source/icons/symbols.svg');
	gulp.src('build/*.html')
		.pipe(inject(sprite, { transform: fileContents }))
		.pipe(gulp.dest('build'));
});

gulp.task("copy", function() {
	return gulp.src([
		"source/fonts/**/*.{woff,woff2}",
		"source/images/**/*",
		"source/data/**/*",
		"source/*.html",
		"source/lib/**/*"
	], {
		base: "source"
	})
	.pipe(gulp.dest("build"));
});

gulp.task("copyhtml", function() {
	var sprite = gulp.src('source/icons/symbols.svg');
	return gulp.src([
		"source/*.html"
	], {
		base: "source"
	})
	.pipe(inject(sprite, { transform: fileContents }))
	.pipe(gulp.dest("build"))
	.pipe(server.reload({stream: true}));
});

gulp.task("clean", function() {
	return del("build");
});

gulp.task("debug", function(fn) {
	run(
		"clean",
		"copy",
		"svginject",
		"styles",
		"jscript",
		fn
	);
});

gulp.task("build", function(fn) {
	run(
		"clean",
		"copy",
		"svginject",
		"images",
		"styles",
		"jscript",
		fn
	);
});

