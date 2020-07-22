require('dotenv').config()
const port = process.env.PORT || 3000
const path = require('path')
const { src, dest, task, watch, parallel, series } = require('gulp')
const nodemon = require('gulp-nodemon')
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



const extensionsToWatch = {
    styles: ['css', 'scss'],
    scripts: ['js', 'mjs'],
    views: ['hmtl', 'ejs']
}

//TODO: Deze variabelen kunnen weg
const htmlToWatch = ['src/client/views/**/*.ejs']
const stylesToWatch = ['src/client/styles/**/*.css', 'src/client/styles/**/*.scss']
const scriptsToWatch = ['src/client/scripts/**/*.js', 'src/client/scripts/**/*.mjs']

task('watch', () => {
    browserSync.init({ proxy: `localhost:${port}` })

    watch(htmlToWatch).on('change', task('reload'))
    watch(stylesToWatch).on('change', task('styles'))
    watch(scriptsToWatch).on('change', series('scripts', 'reload'))
})



//TODO: deze task kan weg
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
        .pipe(browserSync.stream()) //TODO: deze 'pipe' kan weg
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




task('serve', done => {
    browserSync.init({
        proxy: `localhost:${port}`,
        browser: 'google chrome',
        port: 7000
    })
    done()
})


task('test', done => {
    return nodemon({
            script: 'server.js',
            ignore: ['dist', 'gulpfile.js'],
            ext: '*',
            tasks: changedFiles => {
                const tasks = []
                if (!changedFiles) { return tasks }
                changedFiles.forEach(file => {
                    const dotExt = path.extname(file)
                    const ext = dotExt.split('.')[1]
                    if (extensionsToWatch.scripts.includes(ext) && !tasks.includes('scripts')) {
                        tasks.push('scripts')
                    }
                    if (extensionsToWatch.styles.includes(ext) && !tasks.includes('styles')) {
                        tasks.push('styles')
                    }
                })
                return tasks
            },
            done
        })
        .on('restart', () => browserSync.reload())
        .on('crash', err => console.error(err))
})




exports.test = series('test')
exports.serve = series('serve', 'test')
//TODO: rename de exports + tasks
//TODO: voordat de nodemon + watch gestart worden moeten de volgende gulp-tasks uitgevoerd worden: syltes, scripts
//TODO: verwijder oude variabelen zoals cssToWatch etc.