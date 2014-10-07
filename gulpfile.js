var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var htmlreplace = require('gulp-html-replace');
var sass = require('gulp-sass');

// Delete the dist directory
gulp.task('clean', function() {
 return gulp.src('dist')
 .pipe(clean());
});

gulp.task('js', function(){
	gulp.src(['app/module.js', 'app/modules/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/scripts'));
});



gulp.task('js-vendor', function(){
	gulp.src([
			'bower_components/jquery/dist/jquery.js',
			'bower_components/angular/angular.js',
			'bower_components/bootstrap/dist/js/bootstrap.js',
			'bower_components/angular-resource/angular-resource.js',
			'bower_components/angular-cookies/angular-cookies.js',
			'bower_components/angular-sanitize/angular-sanitize.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'bower_components/angular-animate/angular-animate.js'
			])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('html', function(){
	gulp.src(['app/index.html', 'app/modules/**/*html'],{base: './app'})
		.pipe(gulp.dest('dist'));
});

gulp.task('css', function(){
	gulp.src(['bower_components/**/*.css', 'app/styles/**/*.css', 'bower_components/bootstrap/dist/css/*.map'])
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('sass', function() {
	gulp.src('app/styles/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('img', function(){
	gulp.src(['app/images/**/*.png', 'app/images/**/*.jpg', 'app/images/**/*.svg'])
		.pipe(gulp.dest('dist/images'));
});

gulp.task('assets', function(){
	gulp.src('app/bower_components/bootstrap/dist/fonts/**/*', {base: './app/bower_components'})
		.pipe(gulp.dest('dist/styles'));
});

//Starts the web server and watch for changes
gulp.task('server', function() {
  connect.server({
  	port:9000,
  	
  	livereload: true,
  	root: ['.', 'dist'],
  	middleware: function(connect, o) {
        return [ (function() {
            var url = require('url');
            var proxy = require('proxy-middleware');
            var options = url.parse('http://195.254.203.79/api/latest');
            options.route = '/api/latest';
            return proxy(options);
        })() ];
    }
  });
});

//Watch relevant files and rerun tasks accordingly
gulp.task('watch', function() {
    gulp.watch('app/modules/**/*.js', ['js']);
    gulp.watch('app/styles/**/*.scss', ['sass']);
    gulp.watch('app/modules/**/*.html', ['html']);
});

gulp.task('livereload', function() {
  gulp.src(['dist/styles/*.css', 'dist/scripts/*.js', 'dist/**/*.html'])
    .pipe(watch())
    .pipe(connect.reload());
});


// Default Task
gulp.task('default', ['js', 'js-vendor', 'html', 'css', 'sass', 'img', 'assets']);
gulp.task('dev', ['js', 'html', 'css', 'img', 'assets']);
gulp.task('deploy', ['js', 'js-vendor','html', 'css', 'sass', 'img', 'assets']);

gulp.task('serve', ['deploy','server', 'livereload', 'watch']);
