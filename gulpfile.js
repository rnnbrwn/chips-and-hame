// Get variables from node_modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const { src, dest } = require('gulp');

// Run gulp build to copy everything from src into dist
// TODO code this better so it doesn't take all the scss stuff
async function build() {
    src('./src/**/*.*')
    .pipe(dest('./dist/'));
}
    
// Compile scss into css
function style() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
}

// Run gulp watch
function watch() {
    browserSync.init({
        server: {
            baseDir: './src',
            // directory: true
        }
    });
    gulp.watch('./src/scss/**/*.scss', style)
    gulp.watch('./src/**/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
 
}

exports.style = style;
exports.watch = watch;
exports.build = build;
