gulp-load-directory
===================
A bootstrapping function for loading a directory of gulp tasks.

## Usage
```javascript
'use strict';
var path = require('path');
var gulp = require('gulp');
var loadDirectory = require('gulp-load-directory');

loadDirectory(path.join(__dirname, 'tasks'));
gulp.task('default', ['copy', 'browserify']);
```

## LICENSE
This code is licensed under the MIT license for Pedro Tacla Yamada. For more
information please refer to the [LICENSE](/LICENSE) file.
