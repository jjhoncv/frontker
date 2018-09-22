const gulp = require('gulp'),
      pug = require('gulp-pug'),
      stylus = require('gulp-stylus'),
      babel = require('gulp-babel'),
      imagemin = require('gulp-imagemin'),
      svgSymbols = require('gulp-svg-symbols'),
      runSequence = require('run-sequence'),
      del = require('del');

const path = require('./config').path;

gulp.task('clean', function(cb){
  return del([
    path.public + 'static/css',
    path.public + 'static/fonts',
    path.public + 'views/*',
    path.public + 'static/icons',
    path.public + 'static/imgs',
    path.public + 'static/js'
  ], { force: true }, cb);
})

gulp.task('html', function(){
  return gulp.src(path.src + 'html/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.public + 'views'))
})

gulp.task('css', function(){
  return gulp.src(path.src + 'css/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest(path.public + 'static/css'))
})

gulp.task('js', function(){
  return gulp.src(path.src + 'js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest(path.public + 'static/js'))
})

gulp.task('imgs', function(){
  return gulp.src(path.src + 'imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest(path.public + 'static/imgs'))
})

gulp.task('icons', function(){
  return gulp.src(path.src + 'icons/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest(path.public + 'static/icons'))
})

gulp.task('fonts', function(){
  return gulp.src(path.src + 'fonts/*')
    .pipe(gulp.dest(path.public + 'static/fonts'))
})

gulp.task('watch', function(){
  gulp.watch(path.src + 'css/*.styl', ['css'])
  gulp.watch(path.src + 'fonts/*', ['fonts'])
  gulp.watch(path.src + 'html/*.pug', ['html'])
  gulp.watch(path.src + 'icons/*.svg', ['icons'])
  gulp.watch(path.src + 'imgs/*', ['imgs'])
  gulp.watch(path.src + 'js/*.js', ['js'])
})

gulp.task('default', ['clean'], function(cb){
  runSequence('html', 'css', 'js', 'imgs', 'icons', 'fonts', cb)
})
