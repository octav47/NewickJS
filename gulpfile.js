'use strict'

let gulp = require('gulp')
let babel = require('gulp-babel')
let uglify = require('gulp-uglify')
let rename = require('gulp-rename')
let concat = require('gulp-concat')
let browserify = require('browserify')
let babelify = require('babelify')
let rimraf = require('rimraf')

let path = {
    root: './',
    src: './src/',
    dist: 'dist/',
    entryPoint: './src/index.js'
}

gulp.task('clean', function (cb) {
    rimraf(path.dist, cb)
})

gulp.task('dist', () => {
    gulp.src(path.entryPoint)
        .pipe(babel({
            "presets": ["env"],
            "plugins": ["transform-class-properties"]
        }))
        .pipe(gulp.dest('dist'))
})

gulp.task('make', () => browserify()
    .transform(babelify.configure({
        presets: ['es2015', 'stage-0']
    }))
    .require(path.entryPoint, { entry: true })
    .bundle()
    .pipe(gulp.dest(path.root)))

gulp.task('js', function(){
    return browserify({
        entries: [path.entryPoint]
    })
        .transform(babelify.configure({
            "presets": ["env"],
            "plugins": ["transform-class-properties"]
        }))
        .bundle()
        .pipe(gulp.dest(path.dist))
})

gulp.task('default', ['clean', 'dist'])
