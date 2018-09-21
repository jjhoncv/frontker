const gulp = require('gulp'),
      pug = require('gulp-pug'),
      stylus = require('gulp-stylus'),
      babel = require('gulp-babel'),
      imagemin = require('gulp-imagemin'),
      svgSymbols = require('gulp-svg-symbols'),
      runSequence = require('run-sequence'),
      del = require('del');

gulp.task('clean', function(cb){
  return del([
    './../public/static/css',
    './../public/static/fonts',
    './../public/views/*',
    './../public/static/icons',
    './../public/static/imgs',
    './../public/static/js'
  ], { force: true }, cb);
})

gulp.task('html', function(){
  return gulp.src('./src/html/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./../public/views'))
})

gulp.task('css', function(){
  return gulp.src('./src/css/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./../public/static/css'))
})

gulp.task('js', function(){
  return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./../public/static/js'))
})

gulp.task('imgs', function(){
  return gulp.src('./src/imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./../public/static/imgs'))
})

gulp.task('icons', function(){
  return gulp.src('./src/icons/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest('./../public/static/icons'))
})

gulp.task('fonts', function(){
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./../public/static/fonts'))
})

gulp.task('watch', function(){
  gulp.watch('./src/css/*.styl', ['css'])
  gulp.watch('./src/fonts/*', ['fonts'])
  gulp.watch('./src/html/*.pug', ['html'])
  gulp.watch('./src/icons/*.svg', ['icons'])
  gulp.watch('./src/imgs/*', ['imgs'])
  gulp.watch('./src/js/*.js', ['js'])
})

gulp.task('default', ['clean'], function(cb){
  runSequence('html', 'css', 'js', 'imgs', 'icons', 'fonts', cb)
})
