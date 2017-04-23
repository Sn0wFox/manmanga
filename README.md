[![Build Status](https://travis-ci.org/Sn0wFox/manmanga.svg?branch=master)](https://travis-ci.org/Sn0wFox/manmanga)

# Manmanga

Awesome manga and anime dedicated search engine. This is the very beginning of Manmanga, and despite my lack of time right now, here's a link to a _very_ [alpha release](http://manmanga.sn0wfox.com) !

## Run the project

### Prerequisites

- Ensure you have Node.js(https://nodejs.org/en/) installed (version 5+)
- Ensure you have npm installed (version 3+)
- Install global dependencies: run `npm install -g gulp-cli webpack webpack-dev-server typescript karma-cli`

### Build and run

1. Clone the project

    ```shell
    git clone https://github.com/Sn0wFox/man-manga.git
    cd man-manga
    ```

2. Install needed dependencies

    ```shell
    npm install
    ```

3. Build and run it

    ```shell
    npm run deploy
    ```

## Test
In order to run all the tests, you'll need to have a decent version (pretty recent) of *Firefox* installed.
The recommended one is `50.0`.

Then, you just have to run:

```
npm run test
```

It will execute all tests: lib, server side and client side. To execute specific tests, pick one of the following:
```
gulp lib:test
gulp server:test
gulp client:test
```

## Dev

### Watch and rebuild
When working on the client, you can use the task:

```shell
gulp client:watch
```

which will automatically watch for changes client side, and rebuild associated files.

### Use our own index
To use API calls that are calling our own index, you must set an environment
variable `INDEXDEN_ENDPOINT` to the right URL to our indexden server,
otherwise calls won't work.

## Dev Notes

### Voice actors

When searching for character on dbpedia,
we often come across _voice actors_.
It could be nice to add them to the list of things that
we can search.

Moreover, people are fairly more documented in dbpedia than
fictional characters.

### Characters

Fictional characters are only well documents in dbpedia if
they are well known.
That's sad, but that's the truth.

To overcome this situation, we could force a second research
if the first one in wikipedia doesn't bring a character;
we could use anilist.o API `/character/search/{query}`.
