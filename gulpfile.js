var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin');

// runs live reload
gulp.task('connect', function() {
  connect.server({
    port: 6969,
    root: 'build/',
    livereload: true
  });
});

// compresses images
gulp.task('imageCompress', function(){
  gulp.src('build/img/*')
  .pipe(imagemin())
  .on('error', logError)
  .pipe(gulp.dest('build/img'));
});

// compiles jade to html
gulp.task('jade', function(){
  gulp.src('jade/*.jade')
  .pipe(jade())
  .on('error', logError)
  .pipe(gulp.dest('build/index.html'))
  .pipe(connect.reload());
});

// compiles sass to css
gulp.task('sass', function(){
  gulp.src('sass/*.sass')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .on('error', logError)
  .pipe(gulp.dest('build/css'))
  .pipe(connect.reload());
});

// minifies js files
gulp.task('scripts', function(){
  gulp.src('js/*.js')
  .pipe(uglify())
  .on('error', logError)
  .pipe(gulp.dest('build/js'))
  .pipe(connect.reload());
});

// controllers
gulp.task('subscripts', function(){
  gulp.src('js/controllers/*.js')
  .pipe(uglify())
  .on('error', logError)
  .pipe(gulp.dest('build/js/controllers'))
  .pipe(connect.reload());
})

// updates index.html from its jade file
gulp.task('updateIndex', function(){
  gulp.src('index.jade')
  .pipe(jade())
  .on('error', logError)
  .pipe(gulp.dest('./build'))
  .pipe(connect.reload());
});

// watch for saves
gulp.task('watch', function(){
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('sass/*.sass', ['sass']);
  gulp.watch('jade/*.jade', ['jade']);
  gulp.watch('index.jade', ['updateIndex']);
});

// default gulp task
gulp.task('default', ['connect', 'imageCompress', 'jade', 'sass', 'scripts', 'subscripts', 'updateIndex', 'watch']);

// other functions
function logError(error){
  console.error.bind(error);
  this.emit('end');
}
