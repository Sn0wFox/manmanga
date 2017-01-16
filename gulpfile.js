"use strict"

const gulp = require('gulp');                     // Local gulp lib
const gutil = require('gulp-util');               // To add some logs
const gpug = require('gulp-pug');                 // To support pug compile
const gsass = require('gulp-sass');               // To support scss and sass compile
const typescript = require('gulp-typescript');    // To make gulp work with TypeScript compiler
const sourcemaps = require('gulp-sourcemaps');    // To produce .map.js files while compiling
const webpack = require('webpack');               // Local webpack lib
const gwebpack = require('webpack-stream');       // To use webpack with gulp
const del = require('del');                       // To erase some file during cleaning tasks

// TODO: separate this config
const tscConfig = require('./tsconfig.json');     // Gather the options for TypeScript compiler
const wpconf = require('./webpack.config.js');


/* BASIC TASKS */

/**
 * Compiles TypeScript files from src/server
 * using the typings, and generates .map.js files too.
 */
gulp.task('server:build', () => {
  return gulp
    .src(['src/server/**/*.ts', 'node_modules/@types/**/*.ts', 'src/custom-typings/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/server"));
});

/**
 * Compiles TypeScript files from src/lib
 * using the typings, and generates .map.js files too.
 */
gulp.task('lib:build', () => {
  return gulp
    .src(['src/lib/**/*.ts', 'node_modules/@types/**/*.ts', 'src/custom-typings/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/lib"));
});

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
 * Builds all files other than javascript needed client-side.
 */
gulp.task('client:build:assets', ['client:build:pug', 'client:build:sass', 'client:build:htmlcss', 'client:build:static', 'client:build:materialize']);

/**
 * Build all files needed client-side
 * (.ts, .pug, .html, .sass, .scss, .css, client/static/*).
 */
gulp.task('client:build', ['client:build:webpack', 'client:build:assets']);

/**
 * Build all javascript files,
 * except those needed client-side.
 * NOTE:  when client:build will work,
 *        this should build client too.
 */
gulp.task('all:build', ['lib:build', 'server:build', 'client:build']);
