# Contributing

## Environment

- _python_ 2.7 (Does not work with Python 3)
- [_node_ 7][notes-node]
- [_npm_ **4**][notes-npm] (Node currently only bundles _npm_ 3)
- [_gulp (CLI)_][notes-gulp]
- [_typings_][notes-typings]

## Install, build, run, test

```shell
npm install
gulp all:clean-build
# Run: (or "npm start" ?)
node build/server/server/main.js
npm test
```

## Gulp tasks

This project has three targets:

- `server`: Node target, compiles all normal scripts except for `client` and `test`, generates static assets.
- `client`: Webpack target, compiles `client`, `lib` and `app` scripts and bundles templates and styles used by the application
  into `main.js` into the server's directory for static files (`build/server/static`)
- `test`: Test target, runs `spec` scripts

It also has a "virtual" target `all` that calls the tasks of both `server` and `client`.

### `all:clean-build`

Clean any previous build and compiles everything.

```shell
bulp all:clean-build
```

### `all:watch`

Build the project once and then watch source files for changes.
Triggers a build for the files that changed.

```shell
gulp all:watch
```

### `:lint`

Check TSLint rules for all Typescript files

```shell
gulp :lint
```

_Note_: Use `tslint:disable-next-line:<rule1> <rule2>` in line comments
to disable a rule for the next block.

### `test`

Build and run `test` target (mocha unit tests for the server)

```shell
gulp test
```


[notes-gulp]: https://github.com/demurgos/notes/blob/master/tools/languages/javascript/gulp.md
[notes-node]: https://github.com/demurgos/notes/blob/master/tools/languages/javascript/node.md
[notes-npm]: https://github.com/demurgos/notes/blob/master/tools/languages/javascript/npm.md
[notes-typings]: https://github.com/demurgos/notes/blob/master/tools/languages/typescript/typings.md
