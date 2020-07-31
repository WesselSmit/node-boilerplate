# Node Boilerplate

A template repository to quickly setup a NodeJS application using ExpressJS

## Install Notes

```sh
$ git clone https://github.com/WesselSmit/node-boilerplate.git REPOSITORY-NAME 
$ cd REPOSITORY-NAME
$ sh init.sh REPOSITORY-NAME 
$ npm run dev # see 'Scripts' section in readme
```

## Scripts

This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>` or `yarn run <script name>`:

* `dev`: Run aplication in development mode, automatically watch files for changes and reloads browser and server
* `start`: Run application in production mode
* `clean`: Delete all compiled styles, scripts and sourcemaps outputted to **dist** folder (used in `dev` and `start`)
* `build`: Build all styles and scripts according to the **gulpfile.js** (used in `dev` and `start`)

## Usage

### Templating Engine

This boilerplate uses the [EJS](https://ejs.co/) templating engine by default, uf you want to use a different templating engine you'll need to make some adjustments:

1. Set your templating engine as default in Express

Express expects the extension not the full name of the templating engine, so `handlebars` is `hbs` etc.

```js
app.set('view engine', 'TEMPLATING-ENGINE')
```

2. Make sure Nodemon and Gulp are watching your templating files

The [gulpfiles.js](https://github.com/WesselSmit/node-boilerplate/blob/documentation/gulpfile.js) contains a `extToWatch` variable, make sure `extToWatch.views` contains your templating engine extension, if it's missing you'll have to add it.

```js
const extToWatch = {
    styles: [...],
    scripts: [...],
    views: ['hmtl', 'ejs', 'TEMPLATING-ENGINE-EXTENSION']
}
```

### Styling

This boilerplate is configured for [SCSS](https://sass-lang.com/), if you want to use other preprocessors you'll have to rewrite the Gulp `styles` task and update the `extToWatch.styles` array.

### Scripting

This boilerplate is configured for vanilla JS (ES6+), if you want to use supersets of JS you'll have to rewrite the Gulp `scripts` task and update the `extToWatch.scripts` array.

>ES modules and ES6+ syntax are supported (since the Gulp `scripts` task uses rollup and babel)
