'use strict'; /* global describe, it */
var assert = require('assert');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var makeStub = require('mocha-make-stub');

var loadDirectory = require('..');

describe('gulp-load-directory', function() {
  describe('loadDirectory(dir)', function() {
    makeStub(gutil, 'log');
    makeStub(gulp, 'task');

    it('bootstraps tasks into gulp', function() {
      loadDirectory(path.join(__dirname, '../example/tasks'));
      assert(this.task.called === true, 'gulp.task gets called');
      assert(this.task.calledWith('browserify'));
      assert(this.task.calledWith('browserify:javascript'));
      assert(!this.task.calledWith('browserify:'));
    });
  });
});
