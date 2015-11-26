'use strict';
import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('bootstrap-styles', function () {

    // Put bootstrap.min.css in the build/vendor folder
    return gulp.src(config.bootstrap.src)
        .pipe(changed(config.bootstrap.dest))
        .pipe(gulp.dest(config.bootstrap.dest))
        .pipe(browserSync.stream({ once: true }));
});