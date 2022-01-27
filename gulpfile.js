/**
*   Gulp with TailwindCSS - An CSS Utility framework
*   Author : Manjunath G
*   URL : manjumjn.com | lazymozek.com
*   Twitter : twitter.com/manju_mjn
**/

/*
  Usage:
  1. npm install //To install all dev dependencies of package
  2. npm run dev //To start development and server for live preview
  3. npm run prod //To generate minifed files for live server
*/

const { src, dest, task, watch, series, parallel } = require('gulp');
const del = require('del'); //For Cleaning build/dist for fresh export
const options = require("./config"); //paths and other options from config.js
const browserSync = require('browser-sync').create();

const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass'); //For Compiling SASS files
const postcss = require('gulp-postcss'); //For Compiling tailwind utilities with tailwind config
const concat = require('gulp-concat'); //For Concatinating js,css files
const minifyJS = require('gulp-terser');//To Minify JS files
const htmlmin = require('gulp-htmlmin');//To Minify HTML files
const imagemin = require('gulp-imagemin'); //To Optimize Images
const cleanCSS = require('gulp-clean-css');//To Minify CSS files
const purgecss = require('gulp-purgecss');// Remove Unused CSS from Styles
const critical = require('critical').stream;
const svgSprite = require('gulp-svg-sprite');
const plumber = require('gulp-plumber');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const path = require("path");
const rename = require('gulp-rename');





//Note : Webp still not supported in major browsers including forefox
const webp = require('gulp-webp'); //For converting images to WebP format
const replace = require('gulp-replace'); //For Replacing img formats to webp in html
const logSymbols = require('log-symbols'); //For Symbolic Console logs :) :P

//Load Previews on Browser on dev
function livePreview(done){
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base
    },
    port: options.config.port || 5000,
    notify: false
  });
  done();
}

// Triggers Browser reload
function previewReload(done){
  console.log("\n\t" + logSymbols.info,"Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

//Development Tasks
function devHTML(){
  return src(`${options.paths.src.base}/*.html`)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(useref())
    .pipe(rename(function(file) {
      if(file.extname === '.html' && file.basename !== 'index') {
        file.dirname = path.join(file.dirname, file.basename);
        file.basename = 'index';
        file.extname = '.html';
      }
    }))
    .pipe(dest(options.paths.dist.base));
}

//svg sprite task
function svgSprites(){
  return src(`${options.paths.src.img}/icons/*.svg`)
    .pipe(plumber())
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                { removeNonInheritableGroupAttrs: true },
                { collapseGroups: true },
                {
                  removeAttrs: {
                    attrs: 'class|data-name|fill|stroke'
                  }
                }
              ]
            }
          }
        ]
      }
    }))
    .pipe(plumber.stop())
    .pipe(dest(`${options.paths.dist.img}/icons/`));
}



function devStyles(){
  const tailwindcss = require('tailwindcss');
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(options.paths.src.css))
    .pipe(postcss([
      tailwindcss(options.config.tailwindjs),
      require('autoprefixer'),
    ]))
    .pipe(concat({ path: 'style.css'}))
    .pipe(dest(options.paths.dist.css));
}



function devScripts(){
  return src([
    // `${options.paths.src.js}/libs/**/*.js`,
    `${options.paths.src.js}/**/*.js`,
    // `!${options.paths.src.js}/**/external/*`
  ])
  // .pipe(minifyJS())
  // .pipe(concat({ path: 'scripts.js'}))
  .pipe(dest(options.paths.dist.js))
}

function devImages(){
  return src([
    `${options.paths.src.img}/**/*`,
    `!${options.paths.src.img}/icons/**`,
  ])
  .pipe(dest(options.paths.dist.img));
}
function devFonts(){
  return src(`${options.paths.src.fonts}/*`).pipe(dest(options.paths.dist.fonts));
}

function watchFiles(){
  watch(`${options.paths.src.base}/**/*.{html,json}`,series(devHTML, devStyles, previewReload));
  watch([options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`],series(devStyles, previewReload));
  watch(`${options.paths.src.js}/**/*.js`,series(devHTML, previewReload));
  watch(`${options.paths.src.img}/**/*`,series(devImages, previewReload));
  watch(`${options.paths.src.img}/icons/*`,series(svgSprites, previewReload));
  watch(`${options.paths.src.fonts}/**/*`,series(devFonts, previewReload));
  console.log("\n\t" + logSymbols.info,"Watching for Changes..\n");
}

function devClean(){
  console.log("\n\t" + logSymbols.info,"Cleaning dist folder for fresh start.\n");
  return del([options.paths.dist.base]);
}

//Production Tasks (Optimized Build for Live/Production Sites)
function prodHTML(){
  return src(`${options.paths.dist.base}/**/*.html`)
  .pipe(replace('.png', '.webp'))
  .pipe(replace('.jpg', '.webp'))
  .pipe(replace('.jpeg', '.webp'))
  .pipe(plumber())
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  }))
  .pipe(plumber.stop())
  .pipe(dest(options.paths.build.base));
}

function prodStyles(){
  return src(`${options.paths.dist.css}/**/*`)
  .pipe(purgecss({
    content: ['dist/**/*.{html,js}'],
    defaultExtractor: content => {
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
      const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
      return broadMatches.concat(innerMatches)
    }
  }))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest(options.paths.build.css));
}

function prodScripts(){
  return src(`${options.paths.dist.js}/**/*.js`)
  // .pipe(concat({ path: 'scripts.js'}))
  .pipe(minifyJS())
  .pipe(dest(options.paths.build.js));
}

function prodImages(){
  return src(options.paths.dist.img + '/**/*')
  .pipe(webp())
  .pipe(dest(options.paths.build.img))
}

function prodFonts(){
  return src(options.paths.src.fonts + '/**/*').pipe(dest(options.paths.build.fonts));
}

function prodClean(){
  console.log("\n\t" + logSymbols.info,"Cleaning build folder for fresh start.\n");
  return del([options.paths.build.base]);
}

function buildFinish(done){
  console.log("\n\t" + logSymbols.info,`Production build is complete. Files are located at ${options.paths.build.base}\n`);
  done();
}

// Generate & Inline Critical-path CSS. Works with 1 style.css only in <head>
function criticalCSS () {
    return src('build/*.html')
    .pipe(
      critical({
        base: 'build/',
        inline: true,
        css: ['build/css/style.css'],
        extract: true,
        width: 1300,
        height: 900,
        ignore: {
          rule: [/swiper-button/, /subscription-plans-container/, /toggle-container/]
        }
      })
    )
    .on('error', err => {
      log.error(err.message);
    })
    .pipe(dest('build/'));
};


exports.default = series(
  devClean, // Clean Dist Folder
  parallel(devStyles, devImages, svgSprites, devFonts, devHTML), //Run All tasks in parallel
  livePreview, // Live Preview Build
  watchFiles // Watch for Live Changes
);

exports.prod = series(
  prodClean, // Clean Build Folder
  parallel(prodStyles, prodScripts, prodImages, prodFonts, prodHTML), //Run All tasks in parallel
  // criticalCSS,
  buildFinish
);
exports.svgSprites = svgSprites;
