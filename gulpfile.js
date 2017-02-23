"use strict";

const gulp        = require('gulp');              // Local gulp lib
const gutil       = require('gulp-util');         // To add some logs
const gpug        = require('gulp-pug');          // To support pug compile
const gsass       = require('gulp-sass');         // To support scss and sass compile
const gjasmine    = require('gulp-jasmine');      // To build and run tests
const guglify     = require('gulp-uglify');       // To build minimized files
const gtypescript = require('gulp-typescript');   // To make gulp work with TypeScript compiler
const gsourcemaps = require('gulp-sourcemaps');   // To produce .map.js files while compiling
const gwebpack    = require('webpack-stream');    // To use webpack with gulp
const webpack     = require('webpack');           // Local webpack lib
const del         = require('del');               // To erase some file during cleaning tasks
const karma       = require('karma');             // To run server side tests

// TODO: separate this config
const tscClientConfig   = require('./tsconfig.json');         // Gather the options for client TypeScript compiler
const tscServerConfig   = require('./tsconfig.server.json');  // Gather the options for server TypeScript compiler
const wpconf            = require('./webpack.config.js');


/* BASIC TASKS */

/* lib */


/**
 * Compiles TypeScript files from src/lib
 * using the typings, and generates .map.js files too.
 */
gulp.task('lib:build:ts', () => {
  return gulp
    .src(['!src/lib/**/*.spec.ts', 'src/lib/**/*.ts', 'node_modules/@types/**/*.ts', 'src/custom-typings/**/*.ts'])
    .pipe(gsourcemaps.init())
    .pipe(gtypescript(tscServerConfig.compilerOptions))
    .pipe(gsourcemaps.write('.'))
    .pipe(gulp.dest('dist/lib'));
});

/**
 * Cleans all files in the dist/lib folder,
 * aka lib files.
 */
gulp.task('lib:clean', () => {
  return del('dist/server/**/*');
});

/**
 * Builds all .spec.ts files for the lib,
 * needed to run lib tests.
 */
gulp.task('lib:test:build', () => {
  return gulp.src('src/lib/**/*.spec.ts')
    .pipe(gtypescript(tscServerConfig.compilerOptions))
    .pipe(gulp.dest('dist/lib'));
});

/**
 * Runs all files .spec.js for the lib,
 * aka lib tests.
 */
gulp.task('lib:test:run', () => {
  return gulp.src('dist/lib/**/*.spec.js')
    .pipe(gjasmine());
});

/**
 * Cleans all .spec.js files in the dist/lib folder,
 * aka lib test files.
 */
gulp.task('lib:test:clean', () => {
  return del('dist/lib/**/*.spec.js');
});

/**
 * Cleans the dist/lib folder by removing it.
 */
gulp.task('lib:clean', () => {
  return del('dist/lib/**/*');
});


/* server */


/**
 * Compiles TypeScript files from src/server
 * using the typings, and generates .map.js files too.
 */
gulp.task('server:build:ts', () => {
  return gulp
    .src(['!src/server/**/*.spec.ts', 'src/server/**/*.ts', 'node_modules/@types/**/*.ts', 'src/custom-typings/**/*.ts'])
    .pipe(gsourcemaps.init())
    .pipe(gtypescript(tscServerConfig.compilerOptions))
    .pipe(gsourcemaps.write('.'))
    .pipe(gulp.dest("dist/server"));
});

/**
 * Cleans all files in the dist/server folder,
 * aka server side files.
 */
gulp.task('server:clean', () => {
  return del('dist/server/**/*');
});

/**
 * Builds all .spec.ts files server side,
 * needed to run server-side tests.
 */
gulp.task('server:test:build', () => {
  return gulp.src('src/server/**/*.spec.ts')
    .pipe(gtypescript(tscServerConfig.compilerOptions))
    .pipe(gulp.dest('dist/server'));
});

/**
 * Runs all files .spec.js server side,
 * aka server side tests.
 */
gulp.task('server:test:run', () => {
  return gulp.src('dist/server/**/*.spec.js')
    .pipe(gjasmine());
});

/**
 * Cleans all .spec.js files in the dist/server folder,
 * aka server side test files.
 */
gulp.task('server:test:clean', () => {
  return del('dist/server/**/*.spec.js');
});

/**
 * Cleans the dist/server folder by removing it.
 */
gulp.task('server:clean', () => {
  return del('dist/server/**/*');
});


/* client */


/**
 * Build client javascript with webpack.
 */
gulp.task('client:build:webpack', () => {
  // TODO: add progress bar.
  return gulp
    .src('src/client/app/main.browser.ts')
    .pipe(gwebpack(wpconf, webpack))
    .pipe(gulp.dest('dist/client'));
});

/**
 * Uglify and minimize the js bundle file.
 */
gulp.task('client:build:uglify', () => {
  // TODO: add progress bar.
  return gulp
    .src(['dist/client/*.js'])
    .pipe(guglify())
    .pipe(gulp.dest('dist/client'));
});

/**
 * Copies materialize-css files from node_modules.
 */
gulp.task('client:build:materialize', () => {
  return gulp
    .src([
      'node_modules/materialize-css/dist/css/materialize.min.css',
      'node_modules/materialize-css/dist/js/materialize.min.js',
      'node_modules/materialize-css/dist/fonts/**/*'
    ], { base: 'node_modules/materialize-css/dist/' })
    .pipe(gulp.dest('dist/client/static'));
});

/**
 * Copies jquery files from node_modules.
 */
gulp.task('client:build:jquery', () => {
  return gulp
    .src(['node_modules/jquery/dist/jquery.min.js',])
    .pipe(gulp.dest('dist/client/static/js'));
});

/**
 * Compiles Pug files at the root of src/client/app.
 */
gulp.task('client:build:pug', () => {
  return gulp
    .src('src/client/app/*.pug')
    .pipe(gpug())
    .pipe(gulp.dest('dist/client'));
});

/**
 * Compiles Sass (.sass and .scss) files at the root of src/client/app.
 */
gulp.task('client:build:sass', () => {
  return gulp
    .src(['src/client/app/*.scss', 'src/client/app/*.sass'])
    .pipe(gsass())
    .pipe(gulp.dest('dist/client'));
});

/**
 * Copies html and css files at the root of src/client.
 */
gulp.task('client:build:htmlcss', () => {
  return gulp
    .src(['src/client/app/*.html', 'src/client/app/*.css'])
    .pipe(gulp.dest('dist/client'));
});

/**
 * Copies static files (e.g. pictures, .ico)
 * from src/client/static into dist/client/static.
 */
gulp.task('client:build:static', () => {
  return gulp
    .src('src/client/static/**')
    .pipe(gulp.dest('dist/client/static'));
});

/**
 * Single runs client-side tests.
 * NOTE: Firefox browser needs to be installed !
 */
gulp.task('client:test', (done) => {
  return (new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ["Firefox"]
  }, () => {
    done();   // If only passing "done", the --continue flag makes it fail
  })).start();
});

/**
 * Cleans the dist/client folder by removing it.
 */
gulp.task('client:clean', () => {
  return del('dist/client/**/*');
});


/* watchers */


/**
 * Watch all client files and rebuild them when needed.
 */
gulp.task('client:watch', () => {
  gulp.watch(['src/client/app/*.scss', 'src/client/app/*.sass'], gulp.series('client:build:sass'));
  gulp.watch(['src/client/app/*.pug'], gulp.series('client:build:pug'));
  gulp.watch(['src/client/app/*.html', 'src/client/*.css'], gulp.series('client:build:htmlcss'));
  gulp.watch(['src/static/**/*'], gulp.series('client:build:static'));
  gulp.watch([
    'src/client/*/**.ts',
    'src/lib/*/**.ts',
    'src/client/*/**.pug',
    'src/client/*/**.scss',
    'src/client/*/**.sass'],
    gulp.series('client:build:webpack'));
});


/* others */


/**
 * Cleans the dist folder by removing it.
 */
gulp.task('all:clean', () => {
  return del('dist/**/*');
});

/**
 * Logs a red message telling the user that the script
 * he just used is deprecated.
 */
gulp.task('log:deprecated', () => {
  return gutil.log(gutil.colors.red(
    "DEPRECATED - " +
    "The use of this script is deprecated. " +
    "Please be aware that this may not be available in a future version."));
});


/* COMPOSED TASKS */


/**
 * Builds all files needed for the lib.
 */
gulp.task('lib:build', gulp.parallel(
  'lib:build:ts'));

/**
 * Builds all files needed server side.
 */
gulp.task('server:build', gulp.parallel(
  'server:build:ts'));

/**
 * Builds all files other than javascript needed client-side.
 */
gulp.task('client:build:assets', gulp.parallel(
  'client:build:pug',
  'client:build:sass',
  'client:build:htmlcss',
  'client:build:static',
  'client:build:jquery',
  'client:build:materialize'));

/**
 * Builds all files needed client-side
 * (.ts, .pug, .html, .sass, .scss, .css, client/static/*).
 */
gulp.task('client:build', gulp.parallel(
  'client:build:webpack',
  'client:build:assets'));

/**
 * Builds all javascript files,
 * except those needed client-side.
 * NOTE:  when client:build will work,
 *        this should build client too.
 */
gulp.task('all:build', gulp.parallel(
  'lib:build',
  'server:build',
  'client:build'));
  
/**
 * Builds, runs and thereafter cleans
 * all lib tests.
 */
gulp.task('lib:test', gulp.series(
    'lib:test:clean',
    gulp.parallel('lib:build', 'lib:test:build'),
    'lib:test:run',
    'lib:test:clean'));

/**
 * Builds, runs and thereafter cleans
 * all server side tests.
 */
gulp.task('server:test', gulp.series(
    'server:test:clean',
    gulp.parallel('server:build', 'server:test:build'),
    'server:test:run',
    'server:test:clean'));

/**
 * Runs all tests.
 */
gulp.task('all:test', gulp.series(
  'lib:test',
  'server:test',
  'client:test'
));
