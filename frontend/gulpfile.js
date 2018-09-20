const gulp = require('gulp');
const pug = require('gulp-pug');

gulp.task('html', function(){
  gulp.src('./src/html/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./../public/views'))
})

gulp.task('default', ['html'])
