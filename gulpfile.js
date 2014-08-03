// https://medium.com/objects-in-space/considering-a-static-site-tool-learn-gulp-2fd5f9821fc4
// The source: https://gist.github.com/andrewdc/10659265

// TODO
// 1. Test of gulp.dest('./out') de "out" directory creeert (bootstrap).
// 2. Debug mode: http://symmetrycode.com/debug-mode-in-gulp/
// 3. Sorta livereload: http://symmetrycode.com/super-simple-static-server-in-gulp/
// 4. Deploy:
//    https://github.com/rowoot/gulp-gh-pages
//    https://gist.github.com/koistya/9e7045e5b777d5bc4922

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    
    //sass = require('gulp-sass'),
    stylus = require('gulp-stylus'),

    markdown = require('gulp-markdown'),    
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    server = lr(),
    jade = require('gulp-jade'),
    path = require("path"),

    glob = require('glob');
    fs = require('fs');


var debug = false;

var paths = {
  templates: './templates/',
  stylus: './css/',
  javascript: './js/'
};

// fileinclude: grab partials from templates and render out html files
// ==========================================
gulp.task('fileinclude', function() {
  return  gulp.src(path.join(paths.templates, '*.tpl.html'))
    .pipe(fileinclude())
    .pipe(rename({
      extname: ""
     }))
    .pipe(rename({
      extname: ".html"
     }))
    .pipe(gulp.dest('./'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Includes: included' }));
});

// convert our markdown to html
// gulp.task('markdown', function () {
//     return gulp.src('*.md')
//         .pipe(marked())
//         .pipe(gulp.dest('./out'));
// });

// TODO:
// 1. Think about separation for LOCALS used in the media page -
//    and possible other pages too.  Should we create analogous
//    tasks for each page??? Which could bleed DRY.
gulp.task('jade', function () {
  //console.log([path.join(paths.templates,'*.jade'), '!./'+path.join(paths.templates+'media.jade')]);

  return gulp.src([path.join(paths.templates,'*.jade'), '!./'+path.join(paths.templates+'media.jade')])
    .pipe(jade())
    .pipe(gulp.dest('./'))
    .pipe(connect.reload()); });

gulp.task('media.jade', function () {
  
  function getAlbums() {
    var albums = {};
    var albumName = null;
  
    glob('pictures/*/**', {sync: true}, function(err, files) {
      (function(err,files,cb) {
	for (i=0; i < files.length; i++) {
	
	  var stat = fs.statSync(files[i]);
	
	  if (stat.isDirectory()) {
	    albumName = path.basename(files[i]);
	    this[albumName] = [];
	  } else if (albumName) {
	    this[albumName].push({src: files[i], src_t: files[i], rel: albumName, title: path.basename(files[i])});
	  }
	}
      }).call(albums,err,files);
    });
    return albums;
  }  
  
  var jade_locals = {albums: getAlbums()};
			
  return gulp.src(paths.templates+'media.jade')
    .pipe(jade({locals: jade_locals}))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});

//  Stylus: compile sass to css task - uses Libsass
//===========================================
gulp.task('stylus', function() {
  return gulp.src(path.join(paths.stylus, '*.styl'))
    .pipe(stylus({errors: true}))
    .pipe(gulp.dest('./css/'))
    //.pipe(notify({ message: 'Stylus files dropped!' }))
    .pipe(connect.reload());  
});

gulp.task('js-reload', function() {
  return gulp.src(path.join(paths.javascript, '*.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(connect.reload());
});

//  Connect: sever task
//===========================================
gulp.task('connect', function() {
  connect.server({
    port: 1337,
    root: [__dirname],
    livereload: true
  });
});

gulp.task('watch', ['connect'], function() {
  gulp.watch(path.join(paths.stylus, '*.styl'), ['stylus']);
  gulp.watch(path.join(paths.templates, '**/*.jade'), ['jade']);
  gulp.watch(path.join(paths.templates, '**/media.jade'), ['media.jade']);
  gulp.watch(path.join(paths.javascript, '**/*.js'), ['js-reload']);
});

gulp.task('debug', function() {
  debug = true;
  gutil.log( gutil.colors.green('RUNNING IN DEBUG MODE') );
  gulp.start('default');
});

//  Default Gulp Task
//===========================================
gulp.task('default', ['fileinclude', 'jade', 'media.jade', 'stylus', 'connect', 'watch'], function() {
  debug = debug || false;
});