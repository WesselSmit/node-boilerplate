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

## How to use

### Production

Use `production` when **using/viewing** the application

```sh
npm run start
```

This will start a server on localhost, the link to the app is in the console

### Development

Use `development` when **developing/testing** the application as it will watch all markup, style and script files

```sh
npm run dev
```

This will start a server on localhost and proxy it, link to the proxied app is in the console

All markup, styles and scripts are automatically watched; markup and scripts will reload browser, styles are injected and won't trigger a browser reload

## Features

compilation/transpilation/es6 modules + watch

## Notes

nodemon.json hack with delay 

EJS
