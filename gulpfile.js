'use strict';

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let rimraf = require('rimraf');

let path = {
    dist: 'dist/'
};

gulp.task('clean', function (cb) {
    rimraf(path.dist, cb);
});

gulp.task('dist', () => {
    gulp.src('index.js')
        .pipe(uglify())
        .pipe(rename('newick.min.js'))
        .pipe(gulp.dest(path.dist))
});

gulp.task('default', ['clean', 'dist']);