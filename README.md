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

* `dev`: Run aplication in development mode, [watches](#file-watching) **src/client** files for changes and reloads browser
* `start`: Run application in production mode
* `clean`: Delete all compiled styles, scripts and sourcemaps outputted to **dist** folder (used in `dev` and `start`)
* `build`: Build all styles and scripts according to the **gulpfile.js** (used in `dev` and `start`)

## Features

### File Watching

`npm run dev` runs the application in development mode. It builds all and watches all **markup**, **style** and **script** files from **src/client**, changes to said files will trigger the associated build task and automatically reload the browser.

>markup and script changes trigger full-page reload, style changes are injected into the page

### Building Styles

* compile .scss (incuding `@import`'s)
* minify
* add vendor prefixes
* create sourcemaps

### Building Scripts

* module bundling
* transpile modern JS (ES6+)
* uglify
* create sourcemaps

## Notes

### File Extensions

When using this boilerplate out-of-the-box it expects certain file extensions as input;
* the default templating engine is [EJS](https://ejs.co/)
* use [.scss](https://sass-lang.com/) for styling
* use .js (optionally .mjs) for scripting

### Nodemon delay

This boilerplate uses nodemon to restart the server and browser-sync to update the browser, this can cause problems with ports not being freed up in time for the restart.

To fix this nodemon is delayed (see [nodemon.json](https://github.com/WesselSmit/node-boilerplate/blob/master/nodemon.json)).

**EADDRINUSE**

```
Error: listen EADDRINUSE: address already in use :::3000
```

If your app crashes with an EADDRINUSE error, the port is not freed up in time. To fix this you'll have to increase the [nodemon.json](https://github.com/WesselSmit/node-boilerplate/blob/master/nodemon.json) delay.

>NOTE: This is a very 'hacky' fix and could maybe be prevented by replacing nodemon with [gulp-nodemon](https://github.com/JacksonGariety/gulp-nodemon), also see [issue](https://github.com/WesselSmit/node-boilerplate/issues/1)

