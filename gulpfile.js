var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
  build: {
    html: 'www/',
    js: 'www/js/',
    img: 'www/assets/images/'
  },
  src: {
    html: 'src/app/*.html',
    js: 'src/app/js/*.js',
    img: 'src/assets/images/**/*.*'
  },
  watch: {
    html: 'src/app/**/*.html',
    js: 'src/app/js/**/*.js',
    img: 'src/assets/images/**/*.*'
  },
  clean: './www'
};

var config = {
  server: {
    baseDir: './www'
  },
  tunnel: true,
  host: 'localhost',
  port: 4000
};

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
  gulp.src(path.src.html) 
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js) 
    .pipe(sourcemaps.init()) 
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img) 
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('build', [
  'html:build',
  'js:build',
  'image:build'
]);

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
});

gulp.task('default', ['build', 'webserver', 'watch']);