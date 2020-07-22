# Node Boilerplate

A template repository to quickly setup a NodeJS application using ExpressJS

## Install Notes

1. Click the `use this template` button

2. Create your repository in the wizard

3. Clone the repository to your local system

```sh
git clone https://github.com/USERNAME/REPOSITORY.git
```

4. Navigate to your local repository

```sh
cd REPOSITORY
```

5. Install all dependencies

```sh
npm install
```

6. Run application (see [scripts](#scripts))

```sh
npm run dev
```

## Scripts

This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>` or `yarn run <script name>`:

* `dev`: Run aplication in development mode, automatically watch files for changes and reloads browser and server
* `start`: Run application in production mode
* `clean`: Delete all compiled styles, scripts and sourcemaps outputted to **dist** folder (used in `dev` and `start`)
* `build`: Build all styles and scripts according to the **gulpfile.js** (used in `dev` and `start`)

## Notes

### File Extensions

When using this boilerplate out-of-the-box it expects certain file extensions as input;
* the default templating engine is [EJS](https://ejs.co/)
* use [.scss](https://sass-lang.com/) for styling
* use .js (optionally .mjs) for scripting

### Gulp Watching

See `extToWatch` variable in [gulpfiles.js](https://github.com/WesselSmit/node-boilerplate/blob/documentation/gulpfile.js) for all extensions that trigger gulp/build tasks.

## Features

### File Watching

`npm run dev` runs the application in development mode. It builds and watches all files, changes to said files will trigger the associated build task and automatically reload the browser and server.

### Building Styles

>Expects `.scss` files as input

* compile .scss (incuding `@import`'s)
* minify
* add vendor prefixes
* create sourcemaps

### Building Scripts

>Expects `.js` or `.mjs` files as input

* module bundling
* transpile modern JS (ES6+)
* uglify
* create sourcemaps

