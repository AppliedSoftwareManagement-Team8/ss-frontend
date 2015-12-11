'use strict';
import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('awesome-styles', function () {

    // Put awesome.min.css in the build/vendor folder
    return gulp.src(config.awesome.src)
        .pipe(changed(config.awesome.dest))
        .pipe(gulp.dest(config.awesome.dest))
        .pipe(browserSync.stream({ once: true }));
});