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

var browserifyOptions = {
    entries: ['./src/webuploader.js',],
    standalone: 'WebUploader',
    debug: true
};

gulp.task('build', function() {
    var b = browserify(browserifyOptions);
    bundle(b);
});

gulp.task('watch', function() {
    var b = watchify(browserify(assign({}, watchify.args, browserifyOptions)));
    b.on('update', bundle);
    b.on('log', gutil.log);
    bundle(b);
});

function bundle(b) {
    return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('webuploader.js'))
    .pipe(buffer())
    .pipe(gulpif(options.env === 'prod', uglify()))
    .pipe(gulp.dest('./dist-gulp'));
}

gulp.task('default', ['build']);