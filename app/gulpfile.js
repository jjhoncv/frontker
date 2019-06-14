const gulp = require('gulp'),
  pug = require('gulp-pug'),
  stylus = require('gulp-stylus'),
  babel = require('gulp-babel'),
  imagemin = require('gulp-imagemin'),
  svgSymbols = require('gulp-svg-symbols'),
  // runSequence = require('run-sequence'),
  browserSync = require('browser-sync'),
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

const js = () =>
  gulp.src(path.src + 'js/*.js')
    .pipe(babel())
    .on('error', (err) => {
      console.log(err.toString())
      this.emit('end');
    })
    .pipe(gulp.dest(path.dist + 'statics/js'))

const html = () =>
  gulp.src(path.src + 'html/*.pug')
    .pipe(pug({
      pretty: true,
      locals: vars
    }))
    .on('error', (err) => {
      console.log(err.toString())
      this.emit('end');
    })
    .pipe(gulp.dest(path.dist))

const css = () =>
  gulp.src(path.src + 'css/*.styl')
    .pipe(stylus())
    .on('error', (err) => {
      console.log(err.toString())
      this.emit('end');
    })
    .pipe(gulp.dest(path.dist + 'statics/css'))

const imgs = () =>
  gulp.src(path.src + 'imgs/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist + 'statics/imgs'))

const icons = () =>
  gulp.src(path.src + 'icons/*.svg')
    .pipe(svgSymbols())
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
  gulp.watch(path.src + 'js/*.js', gulp.series(js, reload))
  gulp.watch(path.src + 'css/*.styl', gulp.series(css, reload))
  gulp.watch(path.src + 'fonts/*', gulp.series(fonts, reload))
  gulp.watch(path.src + 'html/*.pug', gulp.series(html, reload))
  gulp.watch(path.src + 'icons/*.svg', gulp.series(icons, reload))
  gulp.watch(path.src + 'imgs/*.png', gulp.series(imgs, reload))
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
  clean,
  js,
  css,
  html,
  icons,
  imgs,
  fonts,
  serve,
  watch
);

module.exports = { dev, build };

// gulp.task('html', () => {
//   return gulp.src(path.src + 'html/*.pug')
//     .pipe(pug({
//       pretty: true,
//       locals: vars
//     }))
//     .on('error', (err) => {
//       console.log(err.toString())
//       this.emit('end');
//     })
//     .pipe(gulp.dest(path.dist))
// })

// gulp.task('css', () => {
//   return gulp.src(path.src + 'css/*.styl')
//     .pipe(stylus())
//     .on('error', (err) => {
//       console.log(err.toString())
//       this.emit('end');
//     })
//     .pipe(gulp.dest(path.dist + 'statics/css'))
// })

// gulp.task('js', () => {
//   return gulp.src(path.src + 'js/*.js')
//     .pipe(babel({
//       presets: ['@babel/env']
//     }))
//     .on('error', (err) => {
//       console.log(err.toString())
//       this.emit('end');
//     })
//     .pipe(gulp.dest(path.dist + 'statics/js'))
// })

// gulp.task('imgs', () => {
//   return gulp.src(path.src + 'imgs/*.png')
//     .pipe(imagemin())
//     .pipe(gulp.dest(path.dist + 'statics/imgs'))
// })

// gulp.task('icons', () => {
//   return gulp.src(path.src + 'icons/*.svg')
//     .pipe(svgSymbols())
//     .pipe(gulp.dest(path.dist + 'statics/icons'))
// })

// gulp.task('fonts', () => {
//   return gulp.src(path.src + 'fonts/**/*')
//     .pipe(gulp.dest(path.dist + 'statics/fonts'))
// })

// gulp.task('serve', () => {

//   browserSync.init({
//     open: false,
//     server: path.dist
//   });

//   gulp.watch(path.src + 'js/*.js', ['js', browserSync.reload])
//   gulp.watch(path.src + 'css/*.styl', ['css', browserSync.reload])
//   gulp.watch(path.src + 'fonts/*', ['fonts', browserSync.reload])
//   gulp.watch(path.src + 'html/*.pug', ['html', browserSync.reload])
//   gulp.watch(path.src + 'icons/*.svg', ['icons', browserSync.reload])
//   gulp.watch(path.src + 'imgs/*.png', ['imgs', browserSync.reload])
// })

// gulp.task('default', ['clean'], () => {
//   runSequence('html', 'css', 'js', 'imgs', 'icons', 'fonts')
// })
