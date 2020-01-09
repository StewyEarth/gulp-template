const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const pug = require("gulp-pug");

function htmlTask() {
  return gulp.src("src/html/*.pug")
    .pipe(sourcemaps.init())
    .pipe(pug({}))
    .pipe(
      rename((path) => {
        if (path.basename != "index") {
          path.dirname = path.basename;
          path.basename = "index";
          path.extname = ".html";
        } else {
          path.extname = ".html";
        }
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
}

function watchHTML() {
  return gulp.watch("src/html/**/*.pug", { ignoreInitial: false }, htmlTask);
}

module.exports = {
  htmlTask,
  watchHTML
};