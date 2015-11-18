'use strict';
import config        from '../config';
import gulp          from 'gulp';

gulp.task('bootstrap-styles', function() {

  // Put bootstrap.min.css in the build/vendor folder
  return gulp.src(config.bootstrap.src)
    .pipe(gulp.dest(config.bootstrap.dest));
});