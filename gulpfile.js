var gulp = require('gulp');
var bourbon = require('bourbon');
var sass = require('gulp-sass');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');
var pug = require('gulp-pug');

gulp.task('default', ['BuildJade', 'BuildJavascript', 'BuildSass'], function () {

  livereload.listen();

  gulp.watch('src/views/**/*.pug', ['BuildJade']);
  gulp.watch('src/javascripts/**/*.js', ['BuildJavascript']);
  gulp.watch('src/sass/**/*.scss', ['BuildSass']);

});

gulp.task('BuildJade', function () {

  return gulp.src('src/views/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('.'));

});

gulp.task('BuildSass', function () {
  return gulp.src('src/sass/app.scss')
    .pipe(sass({
      outputStyle: 'compact',
      includePaths: bourbon.includePaths.concat(['node_modules/'])
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

gulp.task('BuildJavascript', function () {

  var bundleStream = browserify({
    entries: "src/javascripts/app.js",
    debug: true
  }).transform('babelify', {
    presets: ['es2015', 'stage-2']
  }).bundle();

  return bundleStream.on('error', function (error) {
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest("dist/javascripts"))
    .pipe(livereload());
});

gulp.task('build', ['BuildJade', 'BuildJavascript', 'BuildSass']);
