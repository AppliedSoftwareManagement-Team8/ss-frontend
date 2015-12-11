'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('awesome-fonts', function() {

    return gulp.src(config.awesomeFonts.src)
        .pipe(changed(config.awesomeFonts.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.awesomeFonts.dest))
        .pipe(browserSync.stream({ once: true }));

});