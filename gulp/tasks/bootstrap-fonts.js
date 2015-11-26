'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('bootstrap-fonts', function() {

    return gulp.src(config.bootstrapFonts.src)
        .pipe(changed(config.bootstrapFonts.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.bootstrapFonts.dest))
        .pipe(browserSync.stream({ once: true }));

});