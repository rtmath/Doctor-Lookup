var gulp = require('gulp');
var browserify = require ('browserify');
var source = require('vinyl-source-stream');
var browser-sync = require('browser-sync');
var del = require('del');
var jshint = require('jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var utilities = require('gulp-util');
var buildProduction = utilites.env.production;

var lib = require('bower-files')({
  "overrides":{
  "bootstrap" : {
    "main": [
      "less/bootstrap.less",
      "dist/css/bootstrap.css",
      "dist/js/bootstrap.js"
      ]
    }
  }
});

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task("htmlBuild", function() {
  browserSync.reload();
});

gulp.task("jsBuild", ["jsBrowserify", "jshint"], function() {
  browserSync.reload();
});

gulp.task("cssBuild", function() {
  return gulp.src(["content/scss/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
});

gulp.task("clean", function() {
  return del(["build", "tmp"]);
});

gulp.task("build", ["clean"], function() {
  if (buildProduction) {
    gulp.start("minifyScripts");
  } else {
    gulp.start("jsBrowserify");
  }
  gulp.start("bower");
  gulp.start("cssBuild");
});

gulp.task("serve", ["build"], function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(["js/*.js"]);
  gulp.watch(["bower.json"], ["bowerBuild"]);
  gulp.watch(["*.html"], ["htmlBuild"]);
  gulp.watch(["content/scss/*.scss"], ["cssBuild"]);
});

gulp.task("concatInterface", function() {
  return gulp.src("./js/*.-interface.js")
    .pipe(uglify)
    .pipe(gulp.dest("./build/js"));
});

gulp.task("jsBrowserify", ["concatInterface"], function() {
  return browserify ({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function() {
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("bowerCSS", function() {
  return gulp.src(lib.ext("css").files)
    .pipe(concat("vendor.css"))
    .pipe(gulp.dest("./build/css"));
});

gulp.task("bower", ["bowerJS", "bowerCSS"]);

gulp.task("bowerJS", function() {
  return gulp.src(lib.ext("js").files)
    .(concat("vendor.css"))
    .pipe(gulp.dest("./build/css"));
});

gulp.task("bowerBuild", ["bower"], function() {
  browserSync.reload();
});
