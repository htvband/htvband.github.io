// https://medium.com/objects-in-space/considering-a-static-site-tool-learn-gulp-2fd5f9821fc4
// The source: https://gist.github.com/andrewdc/10659265

// TODO
// 0. !!! See next TODO-tag !!!
// 1. Test of gulp.dest('./out') de "out" directory creeert (bootstrap).
// 2. Debug mode: http://symmetrycode.com/debug-mode-in-gulp/
// 3. Sorta livereload: http://symmetrycode.com/super-simple-static-server-in-gulp/

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
    path = require("path");

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
// 1. Replace nanoGallery with Justified Gallery, which has a 90% smaller
//  codebase. https://github.com/miromannino/Justified-Gallery/blob/master/src/js/justifiedGallery.js
// 1. Think about separation for LOCALS used in the media page -
//    and possible other pages too.  Should we create analogous
//    tasks for each page??? Which could bleed DRY.
// 2. Find a Gulp plugin which can create these vars (i.e. pictureFiles),
//    by processing a fileglob.  And even spread it into albums by 
//    directory node(s).
//    Plugins maybe:
//    - https://github.com/adam-lynch/glob-to-vinyl
//    - https://www.npmjs.org/package/vinyl-transform (see inject JS into file)
//    - https://www.npmjs.org/package/gulp-filter
gulp.task('jade', function () {
    var pictureFiles = [
	{src: 'pictures/beeldig/onstage1.jpg', srct: 'pictures/beeldig/onstage1.jpg', title: 'Blazen tonen in de ruimte', ngID: '1', ngAlbumID: '0', ngkind: 'album'},
	{src: 'pictures/beeldig/john1.jpg', srct: 'pictures/beeldig/john1.jpg', title: 'image 1', ngID: '2'}, 
	{src: 'pictures/beeldig/pose1.jpg', srct: 'pictures/beeldig/pose1.jpg', title: 'image 3', ngID: '3', ngAlbumID: '1'}
    ];
  
    var YOUR_LOCALS = {	pictureFiles: pictureFiles };
  
    return gulp.src(path.join(paths.templates,'*.jade'))
      .pipe(jade({locals: YOUR_LOCALS}))
      .pipe(gulp.dest('./'))
      .pipe(connect.reload());
});

//  Stylus: compile sass to css task - uses Libsass
//===========================================
gulp.task('stylus', function() {
  return gulp.src(path.join(paths.stylus, '*.styl'))
    .pipe(stylus({errors: true}))
    .pipe(gulp.dest('./css/'))
    .pipe(notify({ message: 'Stylus files dropped!' }))
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

// function watchStuff(task) {
//   // Listen on port 35729
//   server.listen(35729, function (err) {
//     if (err) {
//       return console.error(err);
//       //TODO use notify to log a message on Sass compile fail and Beep
//     };

//     //Watch task for sass
//     //gulp.watch(path.join(paths.sass, '**/*.scss'), [task]);
//     gulp.watch(path.join(paths.stylus, '**/*.styl'), [task]);    

//     // watch task for gulp-includes
//     gulp.watch(path.join(paths.templates, '**/*.html'), ['fileinclude']);

//   });
// }

gulp.task('watch', ['connect'], function() {
  gulp.watch(path.join(paths.stylus, '*.styl'), ['stylus']);
  gulp.watch(path.join(paths.templates, '**/*.jade'), ['jade']);
  gulp.watch(path.join(paths.javascript, '**/*.js'), ['js-reload']);
});

//  Watch and Livereload using Libsass
//===========================================
// gulp.task('watch', function() {

//  watchStuff('stylus');

// });

//  Watch and Livereload using RUBY Sass
//===========================================
// gulp.task('rubywatch', function() {

//  watchStuff('rubysass');

// });


gulp.task('debug', function() {
  debug = true;
  gutil.log( gutil.colors.green('RUNNING IN DEBUG MODE') );
  gulp.start('default');
});


//  Default Gulp Task
//===========================================
gulp.task('default', ['fileinclude', 'jade', 'stylus', 'connect', 'watch'], function() {
  debug = debug || false;
});

//gulp.task('useruby', ['fileinclude', 'rubysass', 'connect', 'rubywatch'], function() {
//});