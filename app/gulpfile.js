const gulp = require('gulp'),
  pug = require('gulp-pug'),
  stylus = require('gulp-stylus'),
  babel = require('gulp-babel'),
  imagemin = require('gulp-imagemin'),
  svgmin = require('gulp-svgmin'),
  browserSync = require('browser-sync'),
  nib = require('nib'),
  path = require('./config').path,
  del = require('del');

const isProd = process.env.NODE_ENV === 'production';
const pathEnv = isProd ? './.env' : './.env.local';
const dotenv = require('dotenv').config({
  path: pathEnv
});
const vars = require('dotenv-expand')(dotenv).parsed;

const server = browserSync.create();

const clean = () => del([
  path.dist + 'statics/css',
  path.dist + 'statics/fonts',
  path.dist + '**/*.html',
  path.dist + 'statics/icons',
  path.dist + 'statics/imgs',
  path.dist + 'statics/js'
]);

//- Task js
const pathJS = [
  path.src + 'js/*.js',
  "!" + path.src + 'js/_*.js'
];

const js = () =>
  gulp.src(pathJS)
    .pipe(babel())
    .on('error', (err) => {
      console.log(err.toString())
      this.emit('end');
    })
    .pipe(gulp.dest(path.dist + 'statics/js'))

//- Task html
const pathPug = [
  path.src + 'html/*.pug',
  "!" + path.src + 'html/_*.pug'
];

const html = () =>
  gulp.src(pathPug)
    .pipe(pug({
      pretty: true,
      locals: vars
    }))
    .on('error', (err) => {
      console.log(err.toString())
      this.emit('end');
    })
    .pipe(gulp.dest(path.dist))

const pathStylus = [
  path.src + 'css/*.styl',
  "!" + path.src + 'css/_*.styl'
];

//- Task css
const css = () =>
  gulp.src(pathStylus)
    .pipe(stylus({
      use: nib()
    }))
    .on('error', (err) => {
      console.log(err.toString())
      this.emit('end');
    })
    .pipe(gulp.dest(path.dist + 'statics/css'))

const imgs = () =>
  gulp.src(path.src + 'imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist + 'statics/imgs'))

const icons = () =>
  gulp.src(path.src + 'icons/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest(path.dist + 'statics/icons'))

const fonts = () =>
  gulp.src(path.src + 'fonts/**/*')
    .pipe(gulp.dest(path.dist + 'statics/fonts'))


const reload = (done) => {
  server.reload();
  done();
}

const serve = (done) => {
  server.init({
    open: false,
    server: path.dist
  });
  done();
}

const watch = () => {
  gulp.watch(pathJS, gulp.series(js, reload))
  gulp.watch(pathStylus, gulp.series(css, reload))
  gulp.watch(pathPug, gulp.series(html, reload))
  gulp.watch(path.src + 'fonts/*', gulp.series(fonts, reload))
  gulp.watch(path.src + 'icons/*.svg', gulp.series(icons, reload))
  gulp.watch(path.src + 'imgs/*', gulp.series(imgs, reload))
}

const build = gulp.series(
  clean,
  js,
  css,
  html,
  icons,
  imgs,
  fonts
);

const dev = gulp.series(
  build,
  serve,
  watch
);

module.exports = { dev, build };