const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(
            cleanCSS({
                compatibility: 'ie8',
            }),
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});



gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('src/scss/**/*.sass', gulp.series('sass'));
    gulp.watch('src/img/*.jpg', gulp.series('img'));
    gulp.watch('src/js/*.js', gulp.series('js'));
    gulp.watch('src/data/*.json', gulp.series('data')).on('change', browserSync.reload);

});


gulp.task('default', gulp.series('html', 'fonts', 'sass', 'img', 'data', 'js', 'watch'));
