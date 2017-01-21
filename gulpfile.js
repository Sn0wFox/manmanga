"use strict"

const gulp = require('gulp');                     // Local gulp lib
const gutil = require('gulp-util');               // To add some logs
const gpug = require('gulp-pug');                 // To support pug compile
const gsass = require('gulp-sass');               // To support scss and sass compile
const gjasmine = require('gulp-jasmine');         // To build and run tests
const typescript = require('gulp-typescript');    // To make gulp work with TypeScript compiler
const sourcemaps = require('gulp-sourcemaps');    // To produce .map.js files while compiling
const webpack = require('webpack');               // Local webpack lib
const gwebpack = require('webpack-stream');       // To use webpack with gulp
const del = require('del');                       // To erase some file during cleaning tasks
const karma = require('karma');                   // To run server side tests

// TODO: separate this config
const tscConfig = require('./tsconfig.json');     // Gather the options for TypeScript compiler
const wpconf = require('./webpack.config.js');


/* BASIC TASKS */

/* lib */


/**
 * Compiles TypeScript files from src/lib
 * using the typings, and generates .map.js files too.
 */
gulp.task('lib:build:ts', () => {
  return gulp
    .src(['src/lib/**/*.ts', 'node_modules/@types/**/*.ts', 'src/custom-typings/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/lib"));
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
  return gulp.src("src/lib/**/*.spec.ts")
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('dist/lib'));
});

/**
 * Runs all files .spec.js for the lib,
 * aka lib tests.
 */
gulp.task('lib:test:run', (done) => {
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


/* server */


/**
 * Compiles TypeScript files from src/server
 * using the typings, and generates .map.js files too.
 */
gulp.task('server:build:ts', () => {
  return gulp
    .src(['src/server/**/*.ts', 'node_modules/@types/**/*.ts', 'src/custom-typings/**/*.ts', '!src/server/**/*.spec.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
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
  return gulp.src("src/server/**/*.spec.ts")
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('dist/server'));
});

/**
 * Runs all files .spec.js server side,
 * aka server side tests.
 */
gulp.task('server:test:run', (done) => {
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


/* client */


/**
 * Build client javascript with webpack.
 */
gulp.task('client:build:webpack', () => {
  // TODO: add progress bar.
  return gulp
    .src('src/client/main.browser.ts')
    .pipe(gwebpack(wpconf, webpack))
    .pipe(gulp.dest('dist/client'));
});

/**
 * Copies materialize-css files from node_modules.
 */
gulp.task('client:build:materialize', () => {
  return gulp
    .src([
      'node_modules/materialize-css/dist/css/materialize.css',
      'node_modules/materialize-css/dist/js/materialize.js',
      'node_modules/materialize-css/dist/fonts/**/*'
    ], { base: 'node_modules/materialize-css/dist/' })
    .pipe(gulp.dest('dist/client/static'));
});

/**
 * Compiles Pug files at the root of src/client.
 */
gulp.task('client:build:pug', () => {
  return gulp
    .src('src/client/*.pug')
    .pipe(gpug())
    .pipe(gulp.dest('dist/client'));
});

/**
 * Compiles Sass (.sass and .scss) files at the root of src/client.
 */
gulp.task('client:build:sass', () => {
  return gulp
    .src(['src/client/*.scss', 'src/client/*.sass'])
    .pipe(gsass())
    .pipe(gulp.dest('dist/client'));
});

/**
 * Copies html and css files at the root of src/client.
 */
gulp.task('client:build:htmlcss', () => {
  return gulp
    .src(['src/client/*.html', 'src/client/*.css'])
    .pipe(gulp.dest('dist/client'));
});

/**
 * Copies static files (e.g. pictures, .ico)
 * from src/client/static into dist/client/static.
 */
gulp.task('client:build:static', () => {
  return gulp
    .src('src/client/static/*')
    .pipe(gulp.dest('dist/client/static'));
});

/**
 * Single runs client-side tests.
 * NOTE: Forefox browser needs to be installed !
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
    "Please be aware that this may not be avaiillable in a future version."));
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
