/* =====================================================

Nimail Starterkit Gulpfile

======================================================

The settings you need to customize

1.  The name of the working directory of your email
2.  The absolute url where the email images from the test will be accessible
3.  The FTP directory where the email will be transferred files
4.  Host of your FTP
5.  Login of your FTP
6.  Password of your FTP
7.  The API Key of your Mailgun account
8.  The email address of the sender of the email test
9.  The email address of the email recipient test (can be the email address of your [Litmus](http://www.litmus.com/) ou [Email on acid](http://www.emailonacid.com/) account)
10. The subject of your email test

====================================================== */

var config = {
    nimaillocaldir: 'nimail-sassy-ink/', /*1*/
    nimailtesturl: 'http://www.your-domain.com/client-name/your-new-nimail-sassy-ink/', /*2*/
    nimailftpdir: 'www/client-name/your-new-nimail-sassy-ink/', /*3*/
    nimailftphost: 'host', /*4*/
    nimailftplogin: 'login', /*5*/
    nimailftppass: 'pwd', /*6*/
    nimailkey: 'key-mailgun', /*7*/
    nimailsender: 'you@your-domain.com', /*8*/
    nimailrecipient: 'test email address', /*9*/
    nimailsubject: 'Email test: your-new-nimail-sassy-ink' /*10*/
};




/* =====================================================

    Below, change only if you know

====================================================== */

// Gulp Requires
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    ftp = require('gulp-ftp'),
    sendmail = require('gulp-mailgun');
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    fileinclude = require('gulp-file-include'),
    inlineSource = require('gulp-inline-source'),
    inlineCss = require('gulp-inline-css'),
    runSequence = require('run-sequence');


// Default Paths
var paths = {
    nimailtemp: config.nimaillocaldir+'*.temp.html',
    nimailpartials: config.nimaillocaldir+'partials/*.part.html',
    nimailindex: config.nimaillocaldir+'index.html',
    nimailtest: config.nimaillocaldir+'test.html',
    nimailstylesheets: [config.nimaillocaldir+'stylesheets/scss/**/*.scss', config.nimaillocaldir+'stylesheets/scss/*.scss']
};


// Convert Stylesheets Task
gulp.task('convertstyles', function() {
    return gulp.src(paths.nimailstylesheets)
    .pipe(plumber({
        errorHandler: function(err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.nimaillocaldir+'stylesheets/css'));
});


// Partials include Task
gulp.task('fileinclude', function() {
  gulp.src(paths.nimailtemp)
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(rename({extname: ''}))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(config.nimaillocaldir));
});


// Inline Stylesheets Task
gulp.task('inlinestyles', function() {
  return gulp.src(paths.nimailindex)
    .pipe(inlineSource())
    .pipe(inlineCss({
      preserveMediaQueries: true,
      applyWidthAttributes: true
    }))
    .pipe(rename('mail.html'))
    .pipe(gulp.dest(config.nimaillocaldir));
});


// BrowserSync Task
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: config.nimaillocaldir
        }
    });
    gulp.watch(paths.nimailstylesheets, ['convertstyles', reload]);
    gulp.watch([paths.nimailtemp, paths.nimailpartials], ['fileinclude', reload]);
    gulp.watch(paths.nimailindex, ['inlinestyles', 'replace', reload]);
});


// Replace Task
gulp.task('replace', function(){
  return gulp.src(config.nimaillocaldir+'mail.html')
    .pipe(replace('src="', 'src="'+config.nimailtesturl))
    .pipe(rename('test.html'))
    .pipe(gulp.dest(config.nimaillocaldir));
})


// Upload Task
gulp.task('upload', function () {
    return gulp.src(config.nimaillocaldir+'**/*')
    .pipe(ftp({
        host: config.nimailftphost,
        user: config.nimailftplogin,
        pass: config.nimailftppass,
        remotePath: config.nimailftpdir
    }));
});


// Sendmail Task
gulp.task('sendmail', function () {
    gulp.src(config.nimaillocaldir+'test.html')
    .pipe(sendmail({
        key: config.nimailkey,
        sender: config.nimailsender,
        recipient: config.nimailrecipient,
        subject: config.nimailsubject
    }));
});


// Default Tasks
gulp.task('default', function() {
    runSequence('convertstyles', 'fileinclude');
});

// Serve Tasks
gulp.task('serve', function() {
    runSequence('convertstyles', 'fileinclude', 'serve');
});

// Build Tasks
gulp.task('build', function() {
    runSequence('convertstyles', 'fileinclude', 'inlinestyles', 'replace', 'upload');
});

// Sendmail Tasks
gulp.task('send', function() {
    runSequence('sendmail');
});
