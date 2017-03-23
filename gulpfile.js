var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');
    autoprefixer = require('gulp-autoprefixer');
    imagemin = require('gulp-imagemin'), 
    pngquant = require('imagemin-pngquant');
    del = require('del');

gulp.task('app-sass', function () {
    gulp.src('app/scss/main.scss')
       .pipe(sass())
       .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
       .pipe(gulp.dest('dist/css'))
});

gulp.task('libs-sass', function () {
    gulp.src(['bower_components/foundation-sites/assets/foundation.scss'])
        .pipe(sass({
            includePaths: ['bower_components/foundation-sites/scss']
    }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('libs-scripts', function() {
    return gulp.src([ 
        'bower_components/angular/angular.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/foundation-sites/dist/foundation.min.js',

        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('dist/js')); // Выгружаем в папку app/js
});

gulp.task('app-scripts', function() {
    return gulp.src([ 
        'app/js/script.js',
        'app/js/controllers.js'

        ])
        .pipe(concat('app.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(gulp.dest('dist/js')); // Выгружаем в папку app/js
});

gulp.task('img', function() {
    return gulp.src('app/imgs/**/*') // Берем все изображения из app
        .pipe(imagemin({ // Сжимаем их с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', ['app-sass']);
    gulp.watch('app/js/**/*.js', ['app-scripts']);
});

gulp.task('build', ['clean', 'app-sass', 'libs-sass', 'app-scripts', 'libs-scripts'], function() {

});

gulp.task('default', ['watch', 'build']);
gulp.task('clear', function () {
    return cache.clearAll();
})