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

import { src, dest, task, watch, series, parallel } from "gulp";
import { deleteSync } from "del"; //For Cleaning build/dist for fresh export
import { config, paths } from "./config.js"; //paths and other options from config.js
import browserSync from "browser-sync";

import fileinclude from "gulp-file-include";
import postcss from "gulp-postcss"; //For Compiling tailwind utilities with tailwind config
import concat from "gulp-concat"; //For Concatinating js,css files
import minifyJS from "gulp-terser"; //To Minify JS files
import cleanCSS from "gulp-clean-css"; //To Minify CSS files
import purgecss from "gulp-purgecss"; // Remove Unused CSS from Styles
// import critical from "critical";
import svgSprite from "gulp-svg-sprite";
import plumber from "gulp-plumber";
import useref from "gulp-useref";
import path from "path";
import rename from "gulp-rename";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
// TailwindCSS v4 has built-in nesting support

import webp from "gulp-webp"; //For converting images to WebP format
import replace from "gulp-replace"; //For Replacing img formats to webp in html
import logSymbols from "log-symbols"; //For Symbolic Console logs :) :P

//Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: paths.dist.base
    },
    port: config.port || 5000,
    notify: false
  });
  done();
}

// Triggers Browser reload
function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

//Development Tasks
function devHTML() {
  return src(`${paths.src.base}/*.html`)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(useref())
    .pipe(
      rename(function (file) {
        if (file.extname === ".html" && file.basename !== "index") {
          file.dirname = path.join(file.dirname, file.basename);
          file.basename = "index";
          file.extname = ".html";
        }
      })
    )
    .pipe(dest(paths.dist.base));
}

//svg sprite task
function svgSprites() {
  return src(`${paths.src.img}/icons/*.svg`)
    .pipe(plumber())
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg"
          }
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  "removeNonInheritableGroupAttrs",
                  "collapseGroups",
                  {
                    name: "removeAttrs",
                    params: {
                      attrs: "class|data-name|fill|stroke"
                    }
                  }
                ]
              }
            }
          ]
        }
      })
    )
    .pipe(plumber.stop())
    .pipe(dest(`${paths.dist.img}/icons/`));
}


function devStyles() {
  return src(`${paths.src.css}/**/*.css`)
    .pipe(postcss())
    .pipe(cleanCSS())
    .pipe(dest(paths.dist.css));
}

function devScripts() {
  return (
    src([
      // `${paths.src.js}/libs/**/*.js`,
      `${paths.src.js}/**/*.js`
      // `!${paths.src.js}/**/external/*`
    ])
      // .pipe(minifyJS())
      // .pipe(concat({ path: 'scripts.js'}))
      .pipe(dest(paths.dist.js))
  );
}

function devImages() {
  return src([`${paths.src.img}/**/*`, `!${paths.src.img}/icons/**`]).pipe(dest(paths.dist.img));
}


function watchFiles() {
  watch(`${paths.src.base}/**/*.{html,json}`, series(devHTML, devStyles, previewReload));
  watch([config.tailwindjs, `${paths.src.css}/**/*.css`], series(devStyles, previewReload));
  watch(`${paths.src.js}/**/*.js`, series(devHTML, previewReload));
  watch(`${paths.src.img}/**/*`, series(devImages, previewReload));
  watch(`${paths.src.img}/icons/*`, series(svgSprites, previewReload));
  console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}

function devClean() {
  console.log("\n\t" + logSymbols.info, "Cleaning dist folder for fresh start.\n");
  deleteSync([paths.dist.base]);
  return Promise.resolve();
}

//Production Tasks (Optimized Build for Live/Production Sites)
function prodHTML() {
  return (
    src(`${paths.dist.base}/**/*.html`)
      .pipe(replace(".png", ".webp"))
      .pipe(replace(".jpg", ".webp"))
      .pipe(replace(".jpeg", ".webp"))
      .pipe(plumber())
      .pipe(plumber.stop())
      .pipe(dest(paths.build.base))
  );
}

function prodStyles() {
  return src(`${paths.dist.css}/**/*`)
    .pipe(
      purgecss({
        content: ["dist/**/*.{html,js}"],
        defaultExtractor: content => {
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
          const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
          return broadMatches.concat(innerMatches);
        }
      })
    )
    .pipe(cleanCSS())
    .pipe(dest(paths.build.css));
}

function prodScripts() {
  return (
    src(`${paths.dist.js}/**/*.js`)
      // .pipe(concat({ path: 'scripts.js'}))
      .pipe(minifyJS())
      .pipe(dest(paths.build.js))
  );
}

function prodImages() {
  return src(paths.dist.img + "/**/*")
    .pipe(webp())
    .pipe(dest(paths.build.img));
}


function prodClean() {
  console.log("\n\t" + logSymbols.info, "Cleaning build folder for fresh start.\n");
  deleteSync([paths.build.base]);
  return Promise.resolve();
}

function buildFinish(done) {
  console.log("\n\t" + logSymbols.info, `Production build is complete. Files are located at ${paths.build.base}\n`);
  done();
}

// Generate & Inline Critical-path CSS. Works with 1 style.css only in <head>
// function criticalCSS() {
//   return src("build/*.html")
//     .pipe(
//       critical({
//         base: "build/",
//         inline: true,
//         css: ["build/css/style.css"],
//         extract: true,
//         width: 1300,
//         height: 900,
//         ignore: {
//           rule: [/swiper-button/, /subscription-plans-container/, /toggle-container/]
//         }
//       })
//     )
//     .on("error", err => {
//       log.error(err.message);
//     })
//     .pipe(dest("build/"));
// }

export default series(
  devClean, // Clean Dist Folder
  parallel(devStyles, devImages, svgSprites), //Run All tasks in parallel (temporarily disabled devHTML)
  livePreview, // Live Preview Build
  watchFiles // Watch for Live Changes
);

export const prod = series(
  prodClean, // Clean Build Folder
  parallel(prodStyles, prodScripts, prodImages, prodHTML), //Run All tasks in parallel
  // criticalCSS,
  buildFinish
);

export { svgSprites };
