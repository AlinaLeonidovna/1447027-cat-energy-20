const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const terser = require("gulp-terser");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML
const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
}

exports.html = html;

// Images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,svg,png}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"))
}

exports.images = images;

// WebP

gulp.task("webp", () =>
  gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp())
    .pipe(gulp.dest("source/img"))
);

// Sprite

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

// Javascript

const scripts = () => {
  return gulp.src("source/js/script.js")
    .pipe(terser())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

// Del

const clean = () => {
  return del("build");
};
exports.clean = clean;


// Build

const build = gulp.series(
  clean,
  copy,
  // scripts,
  styles,
  sprite,
  html
);

exports.build = build;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  // gulp.watch("source/js/**/*.js", gulp.series(scripts));
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/*.html", gulp.series(html));
}

exports.default = gulp.series(
  styles, server, watcher
);
