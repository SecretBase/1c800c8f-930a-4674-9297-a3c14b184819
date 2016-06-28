var gulp = require('gulp');
var bourbon = require('bourbon');
var sass = require('gulp-sass');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var pug = require('gulp-pug');
var imagemin = require('gulp-imagemin');

var isProduction = process.env.NODE_ENV === 'production';

if (! isProduction) {
  var livereload = require('gulp-livereload');
}

gulp.task('default', ['BuildJade', 'BuildJavascript', 'BuildSass', 'OptimizeImage'], function () {

  if (! isProduction) {
    livereload.listen();

    gulp.watch('src/views/**/*.pug', ['BuildJade']);
    gulp.watch('src/javascripts/**/*.js', ['BuildJavascript']);
    gulp.watch('src/sass/**/*.scss', ['BuildSass']);
    gulp.watch('src/img/*', ['OptimizeImage']);
  }

});

gulp.task('BuildJade', function () {

  var stream = gulp.src('src/views/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('.'));

    if (! isProduction) {
      stream.pipe(livereload());
    }

  return stream;

});

gulp.task('BuildSass', function () {
  var stream = gulp.src('src/sass/app.scss')
    .pipe(sass({
      outputStyle: 'compact',
      includePaths: bourbon.includePaths.concat(['node_modules/'])
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));

    if (! isProduction) {
      stream.pipe(livereload());
    }

    return stream;
});

gulp.task('BuildJavascript', function () {

  var bundleStream = browserify({
    entries: "src/javascripts/app.js",
    debug: true
  }).transform('babelify', {
    presets: ['es2015', 'stage-2']
  }).bundle();

  var stream = bundleStream.on('error', function (error) {
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest("dist/javascripts"));

    if (! isProduction) {
      stream.pipe(livereload());
    }

    return stream;
});

gulp.task('OptimizeImage', function () {

  gulp.src('src/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));

});

gulp.task('build', ['BuildJade', 'BuildJavascript', 'BuildSass', 'OptimizeImage']);
