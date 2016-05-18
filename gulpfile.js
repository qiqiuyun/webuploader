var gulp = require('gulp'),
    gulpif = require('gulp-if')
    uglify = require('gulp-uglify'),
    babel = require("gulp-babel"),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    fs = require('fs'),
    minimist = require('minimist'),
    browserify = require('browserify')
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    amdOptimize = require('gulp-amd-optimizer'),
    path = require('path'),
    watchify = require('watchify'),
    assign = require('lodash.assign');


var options = minimist(process.argv.slice(2), {
  string: 'env',
  default: { env: 'dev' }
});

var b = watchify(browserify(assign({}, watchify.args, {
  entries: ['./src/webuploader.js',],
  debug: true
}))); 


gulp.task('build', function() {

    return b.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('webuploader-new.js'))
      .pipe(buffer())
      .pipe(gulpif(options.env === 'prod', uglify()))
      .pipe(gulp.dest('./dist'));
});


gulp.task('build', bundle); // so you can run `gulp build` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('webuploader-new.js'))
    .pipe(buffer())
    .pipe(gulpif(options.env === 'prod', uglify()))
    .pipe(gulp.dest('./dist'));
}

// gulp.task('default', ['build']);