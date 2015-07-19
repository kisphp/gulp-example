var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var del = require('del');
var bower = require('gulp-bower');
var uglify = require('gulp-uglify');
var path = require('path');

var SYSTEM = '';
var PUBLIC_DIR = SYSTEM + 'public_html/';
var BOWER_DIR = PUBLIC_DIR + 'bower/';
var FRONT = SYSTEM + 'gulp/front/';

var config = {
    files: {
        css: 'style.css',
        js: 'scripts.js'
    },
    paths: {
        source: {
            css: [
                BOWER_DIR + 'bootstrap/dist/css/bootstrap.css',
                FRONT + 'css/*.css'
            ],
            js: [
                BOWER_DIR + 'jquery/dist/jquery.js',
                BOWER_DIR + 'bootstrap/dist/js/bootstrap.js',
                FRONT + 'js/*.js'
            ]
        },
        dest: {
            css: PUBLIC_DIR + 'css/',
            js: PUBLIC_DIR + 'js/',
            bower: BOWER_DIR
        }
    }
};

gulp.task('styles-remove', function(done){
    del(config.paths.dest.css, done);
});

gulp.task('bower-remove', function(done){
    del(config.paths.dest.bower, done);
});

gulp.task('scripts-remove', function(done){
    del(config.paths.dest.js, done);
});

gulp.task('bower', ['remove-files'], function(){
    return bower({ directory: config.paths.dest.bower })
        .pipe(gulp.dest(config.paths.dest.bower))
});

gulp.task('styles', ['bower'], function(){
    return gulp.src(config.paths.source.css)
        .pipe(concat(config.files.css))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.paths.dest.css));
});

gulp.task('scripts', ['bower'], function(){
    return gulp.src(config.paths.source.js)
        .pipe(uglify())
        .pipe(concat(config.files.js))
        .pipe(gulp.dest(config.paths.dest.js));
});

gulp.task('remove-files', [
    'bower-remove',
    'scripts-remove',
    'styles-remove'
]);

gulp.task('default', [
    'styles',
    'scripts',
    'bower'
]);
