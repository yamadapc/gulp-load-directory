'use strict';
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var gulp = require('gulp');
var gutil = require('gulp-util');

exports = module.exports = bootstrapTasksDirectory;

function bootstrapTasksDirectory(targetDir) {
  var files = fs.readdirSync(targetDir).filter(function(f) {
    return f.charAt(0) !== '.';
  });
  var taskGroups = files.map(function(file) {
    return {
      name: path.basename(file, path.extname(file)),
      tasks: require(path.join(targetDir, file)),
    };
  });

  each(taskGroups, function(taskGroup) {
    if(taskGroup.name.charAt(0) === '_') return;

    var prefixedNames = [];
    each(taskGroup.tasks, function(task, taskname) {
      if(taskname.charAt(0) === '_') return;

      var prefixedName = taskGroup.name + ':' + taskname;
      var dependencies = task.dependencies || [];

      prefixedNames.push(prefixedName);
      gulp.task(prefixedName, task.dependencies || [], task);

      var message = 'Bootstrapped ' + chalk.blue(prefixedName);
      if(dependencies.length) {
        var sdependencies = dependencies.map(function(d) {
          return chalk.yellow(d);
        });

        message += ' (' + sdependencies.join(', ') + ')';
      }

      gutil.log(message);
    });
    gulp.task(taskGroup.name, prefixedNames);
  });
}

function each(col, fn) {
  var keys = Object.keys(col);
  for(var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    fn(col[key], key);
  }
}
