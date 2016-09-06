var gulp = require('gulp');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

var DEST_DIR = 'client_build';
var DEST_LIBS_DIR = DEST_DIR + '/libs';
var CLIENT_DIR = 'client_src';

gulp.task('default', function(cb) {
	runSequence('build', cb);
});

gulp.task('dev', ['build'], function(cb) {
	runSequence('watch');
});

gulp.task('build', function() {
	runSequence(
		'clean-build',
		'copy-src',
		['bower']
	);
});

gulp.task('copy-src', function() {
	return gulp.src(CLIENT_DIR + '/**')
		.pipe(gulp.dest(DEST_DIR));
});

gulp.task('bower', function() {
	return bower(DEST_LIBS_DIR);
});

gulp.task('clean-build', function(cb) {
	return gulp.src(DEST_DIR + '/*', {
			read: false
		})
		.pipe(clean({
			force: true
		}));
});