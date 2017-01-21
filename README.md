# angular2-seed

Forked from https://github.com/angular/angular2-seed.
This repo adds gulp and production build tools for a Node.js server.

**Still under development**

## Prerequisites
- Make sure you have [node.js](https://nodejs.org/) installed version 5+
- Make sure you have NPM installed version 3+
- `WINDOWS ONLY` run `npm install -g gulp-cli webpack webpack-dev-server typescript` to install global dependencies

## Usage
- run `npm install` to install dependencies
- run `npm run deploy` to deploy prod server
- open browser to [`http://localhost:3000`](http://localhost:3000)

## (OLD CONF) Dev-server
- run `npm install` to install dependencies
- run `npm start` to fire up dev server
- open browser to [`http://localhost:3000`](http://localhost:3000)
- if you want to use other port, open `package.json` file, then change port in `--port 3000` script

## (DEV) TODOs
- ~~Add support for .pug files (client side)~~
- ~~Add support for .scss/.sass files (client side)~~
- ~~Add support for custom typings folder~~
- ~~Add support for import from `src/lib` client side~~
- ~~Add support for import from `src/lib` server side~~
- ~~Add a way to build client in its own folder~~
- ~~Add a way to build client side with gulp~~
- ~~Add support for global .html and .css files in addition to pug and sass~~
- ~~Add genericity for global .pug files (build)~~
- ~~Add genericity for global .scss/sass files (build)~~
- ~~Add genericity for static files (build)~~
- Add genericity for folders other than `client` and `server` (build)
- ~~Add more logs~~
- Add equivalent of --progress (webpack) in client:build:webpack
- Uglify prod files (client)
- Separate config (client, server, prod, dev, ...)
- Migrate to webpack 2
- ~~Migrate to gulp4~~
