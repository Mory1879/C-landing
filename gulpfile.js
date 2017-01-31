const gulp = require('gulp'),
    path = require('path'),
    pug = require('gulp-pug'),
    less = require('gulp-less')
browserSync = require('browser-sync');

const PROJECT = 'build',
    LESS_DIR = 'less',
    CSS_DIR = 'build/css';

gulp.task('pug', function(){
    gulp.src('templates/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(PROJECT))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('less', function(){
    return gulp.src(LESS_DIR + '/*.less')
        .pipe(less({
            includePaths: LESS_DIR,
        }))
        .pipe(gulp.dest(CSS_DIR))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('copy', function() {
    return gulp.src(LESS_DIR + '/assets/**/*.*')
        .pipe(gulp.dest(CSS_DIR + "/assets"))
})

gulp.task('browser-sync', ['less', 'pug', 'copy'],function(){
    browserSync({
        server: {baseDir: PROJECT},
        notify: true
    })
})

gulp.task('watch', function(){
    gulp.watch(LESS_DIR + '/**', ['less'])
    gulp.watch(['*pug', '**/*.pug'], ['pug'])
})

gulp.task('default', ['browser-sync', 'watch'])