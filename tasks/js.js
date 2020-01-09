const gulp = require("gulp");
const concat = require('gulp-concat');
const sourcemaps = require("gulp-sourcemaps");
const connect = require("gulp-connect");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");


function jsTask() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(connect.reload());
}

function watchJS() {
    return gulp.watch("src/js/**/*.js", { ignoreInitial: false }, jsTask);
}

module.exports = {
    jsTask,
    watchJS
  };