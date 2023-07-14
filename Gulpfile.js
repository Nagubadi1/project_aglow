const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));
})

gulp.task('libs', () => {
    return gulp.src('src/libs/*.js')
        .pipe(gulp.dest('dist/libs'));
})

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('src/js/*.js', gulp.series('js')).on('change', browserSync.reload);
});


gulp.task('default', gulp.series('html', 'js','libs', 'watch'));
