require('dotenv').config()
const port = process.env.PORT || 3000
const { src, dest, task, watch, parallel, series } = require('gulp')
const browserSync = require('browser-sync').create()

const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')

const rollup = require('gulp-better-rollup')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('gulp-uglify')




const htmlToWatch = ['src/client/views/**/*.ejs']
const stylesToWatch = ['src/client/styles/**/*.scss']
const scriptsToWatch = ['src/client/scripts/**/*.js', 'src/client/scripts/**/*.mjs']

task('watch', () => {
    browserSync.init({ proxy: `localhost:${port}` })

    watch(htmlToWatch).on('change', task('reload'))
    watch(stylesToWatch).on('change', task('styles'))
    watch(scriptsToWatch).on('change', series('scripts', 'reload'))
})




task('reload', () => {
    browserSync.reload()
})




const cssEntryPoints = ['src/client/styles/master.scss']

task('styles', () => {
    return src(cssEntryPoints)
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(dest('./dist/styles'))
        .pipe(browserSync.reload({ stream: true }))
})




const jsEntryPoints = ['src/client/scripts/master.js']

task('scripts', () => {
    return src(jsEntryPoints)
        .pipe(sourcemaps.init())
        .pipe(rollup({
            plugins: [
                resolve(),
                babel({ exclude: 'node_modules/**' }),
                commonjs()
            ]
        }, { format: 'iife', }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(dest('./dist/scripts'))
})




exports.build = parallel('styles', 'scripts')
exports.watch = series(parallel('styles', 'scripts'), 'watch')