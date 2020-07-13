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

`npm run dev` runs the application in development mode; meaning it builds all assets and then watches all **markup**, **style** and **script** files and automatically reloads the browser.

>markup and script changes trigger full-page reload, style changes are injected into the page

## Notes

nodemon.json hack with delay 

EJS
