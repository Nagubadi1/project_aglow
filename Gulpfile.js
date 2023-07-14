const gulp = require('gulp');

const browserSync = require('browser-sync').create();

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// gulp.task('fonts', () => {
//     return gulp.src('src/fonts/*.{woff,woff2}')
//         .pipe(gulp.dest('dist/fonts'));
// })

// gulp.task('sass', () => {
//     return gulp.src('src/scss/**/*.sass')
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(
//             cleanCSS({
//                 compatibility: 'ie8',
//             }),
//         )
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('./dist/css'))
//         .pipe(browserSync.stream());
// });

// gulp.task('img', () => {
//     return gulp.src('src/img/*')
//         .pipe(gulp.dest('dist/img'));
// });

// gulp.task('data', () => {
//     return gulp.src('src/data/*.json')
//         .pipe(gulp.dest('dist/data'));
// });


gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));
})


gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload);
 
    gulp.watch('src/js/*.js', gulp.series('js'));
  

});

gulp.task('default', gulp.series('html','js', 'watch'));
