'use strict';

/*
 * --->  Loading External Node.js Modules  <------
 */
var gulp = require('gulp');
var connect = require('connect');
var connectLivereload = require('connect-livereload');
var opn = require('opn');
var gulpLivereload = require('gulp-livereload');
var sass = require('gulp-sass');

/*
 * ---------->  Main Config  <-------------
 */
var config = {

  // this is your local directory to become served as root,
  // e.g. `localhost:port` should point to show `index.html` in that directory
	rootDir: __dirname,

  // any port to use for your local server
	servingPort: 3000,

	// the files you want to watch for changes for live reload
    // replace by any glob pattern matching your files
	filesToWatch: ['*.{html,scss,css,js}', '!Gulpfile.js']
}

/*
 * ---------->  Gulp Tasks  <-------------
 */

// The default task - called when you run `gulp` from CLI
gulp.task('default', ['watch', 'sass', 'serve']);

gulp.task('sass', function () {
    gulp.src('./*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('./'));
});

// `gulp watch` task watching for file changes
gulp.task('watch', ['connect' ], function () {
  gulpLivereload.listen();

  gulp.watch('./*.scss', ['sass']);

  gulp.watch(config.filesToWatch, function(file) {
    gulp.src(file.path)
      .pipe(gulpLivereload());
  });

});

// `gulp serve` task loading the URL in your browser
gulp.task('serve', ['connect'], function () {
  console.log('http://localhost:' + config.servingPort);
  return opn('http://localhost:' + config.servingPort);
});

// `gulp connect` task starting your server
gulp.task('connect', function(){
  return connect()
    .use(connectLivereload())
    .use(connect.static(config.rootDir))
    .listen(config.servingPort);
});
