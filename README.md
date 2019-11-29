# Game Reviews

## Installation

To install the packages needed to run this package run: `npm install`.

Run `npm run build-db` to create the database structure.

Run `npm run add-data` to fill database with game data.

## Running

To run the server, run `npm start`.

To start live-reloading, run `npm run watch`.

## Debugging

You can debug using VS Code by pressing `F5`, this works the same way as `npm run watch` but with added debugging capabilities.

---

## Folder Structure

This project is split into a few folders:

- `build/`: contains build scripts.
- `controllers/`: contains subrouters for different parts of the site.
- `models/`: contains classes that represent database entities.
- `public/`: contains the site's front-end static pages and JavaScript.
- `utils/`: contains shared utility code.
- `views/`: contains dynamic HTML templates.
- `tests/`: contains all tests for the project.
- `./`: contains code that is used directly by the Koa app.
