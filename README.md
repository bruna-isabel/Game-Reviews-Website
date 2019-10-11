# Game Reviews

## Installation

To install the packages needed to run this package run: `yarn install`.

Run `yarn run build-db` to create the database structure.

## Running

To run the server, run `yarn start`.

To live-reloading, run `yarn run watch`.

## Debugging

You can debug using VS Code by pressing <kbd>F5</kbd>, this works the same way as `yarn run watch` but with added debugging capabilities.

---

## Folder Structure

This project is split into a few folders:

- `build/`: contains build scripts.
- `controllers/`: contains subrouters for different parts of the site.
- `models/`: contains classes that represent database entities.
- `public/`: contains the site's front-end static pages and JavaScript.
- `views/`: contains dynamic HTML templates.
- `./`: contains code that is used directly by the Koa app.