require('dotenv').config()
const port = process.env.PORT || 3000
const path = require('path')
const { src, dest, task, parallel, series } = require('gulp')
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




const cssEntryPoints = ['views/styles/master.scss']

task('styles', () => {
    return src(cssEntryPoints)
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(dest('./public/dist/styles'))
})




const jsEntryPoints = ['views/scripts/master.js']

task('scripts', () => {
    return src(jsEntryPoints)
        .pipe(sourcemaps.init())
        .pipe(rollup({
            plugins: [
                resolve(),
                babel(),
                commonjs()
            ]
        }, { format: 'iife', }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(dest('./public/dist/scripts'))
})




const extToWatch = {
    styles: ['css', 'scss'],
    scripts: ['js', 'mjs'],
    views: ['hmtl', 'ejs']
}

task('watch', done => {
    return nodemon({
            script: 'server.js',
            ignore: ['public/dist', 'gulpfile.js'],
            ext: '*',
            tasks: changedFiles => {
                const tasks = []
                if (!changedFiles) { return tasks }
                changedFiles.forEach(file => {
                    const dotExt = path.extname(file)
                    const ext = dotExt.split('.')[1]
                    if (extToWatch.scripts.includes(ext) && !tasks.includes('scripts')) {
                        tasks.push('scripts')
                    }
                    if (extToWatch.styles.includes(ext) && !tasks.includes('styles')) {
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




task('serve', done => {
    browserSync.init({
        proxy: `localhost:${port}`,
        browser: 'google chrome',
        port: 7000
    })
    done()
})




exports.builder = parallel('styles', 'scripts')
exports.watcher = series(parallel('styles', 'scripts'), 'serve', 'watch')