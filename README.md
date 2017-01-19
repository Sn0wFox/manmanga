# Manmanga

Awesome manga and anime dedicated search engine. This is the very beginning of Manmanga, but there should be some alpha releases soon. Stay tuned!

## Run the project

### Prerequisites

- Ensure you have Node.js(https://nodejs.org/en/) installed (version 5+)
- Ensure you have npm installed (version 3+)
- Install global dependecies: run `npm install -g gulp-cli webpack webpack-dev-server typescript`

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
