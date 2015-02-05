'use strict';
var path = require('path');
var gulp = require('gulp');
var loadDirectory = require('..'); // require('gulp-load-directory');
loadDirectory(path.join(__dirname, 'tasks'));
gulp.task('default', ['copy', 'browserify']);
