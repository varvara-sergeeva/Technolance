const gulp = require('gulp');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const del = require('del');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const pump = require('pump');
const uglify = require('gulp-uglify');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(dartSass);
const postcss = require('gulp-postcss');
const cleanCss = require('gulp-clean-css');
const webphtml = require('gulp-webp-html-fixed');
const webp = require('gulp-sharp-responsive');
const autoprefixer = require('autoprefixer');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('cssnano');
const decomment = require('gulp-decomment');
const browserSync = require('browser-sync');
const webpInCss = require('webp-in-css/plugin');

const paths = {
	dirs: {
		build: './build',
	},
	html: {
		src: './src/pages/*.pug',
		dest: './build',
		watch: [
			'./src/pages/*.pug',
			'./src/templates/*.pug',
			'./src/blocks/**/*.pug',
		],
	},
	css: {
		src: './src/styles/style.scss',
		dest: './build/css',
		watch: [
			'./src/blocks/**/*.scss',
			'./src/styles/**/*.scss',
			'./src/styles/*.scss',
		],
	},
	js: {
		src: ['./src/blocks/**/*.js'],
		dest: './build/js',
		watch: ['./src/blocks/**/*.js', './src/js/**/*.js'],
	},
	js2: {
		src: ['./src/js/**/*.js'],
		dest: './build/js',
		watch: './src/plugins/*.js',
	},
	images: {
		src: './src/blocks/**/img/*',
		dest: './build/img',
		watch: ['./src/blocks/**/img/*'],
	},
	fonts: {
		src: './src/fonts/**',
		dest: './build/fonts',
		watch: './src/fonts/**',
	},
	favicon: {
		src: './src/favicon/*',
		dest: './build/',
		watch: './src/favicon/*',
	},
	docs: {
		src: './src/docs/*',
		dest: './build/docs',
		watch: './src/docs/*',
	},
};

gulp.task('clean', function () {
	return del(paths.dirs.build);
});

gulp.task('templates', function () {
	return gulp
		.src(paths.html.src)
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe(webphtml(['jpg', 'jpeg', 'png']))
		.pipe(decomment({
			trim: true
		}))
		.pipe(gulp.dest(paths.html.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('styles', function () {
	return gulp
		.src(paths.css.src, {
			sourcemaps: true
		})
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(plumber())
		.pipe(
			postcss([
				autoprefixer({
					overrideBrowserslist: ['last 10 versions'],
					cascade: false,
				}),
				cssnano(),
			])
		)
		.pipe(gulp.dest(paths.css.dest, {
			sourcemaps: true
		}))
		.on('error', function () {
			this.emit('end');
		})
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('clean style', function () {
	return del('./build/css/style2.bg.css')
});

gulp.task('scripts', function () {
	return gulp
		.src(paths.js.src)
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(babel({
			presets: [
				['@babel/preset-env', {
					modules: false
				}]
			]
		}))
		.pipe(gulp.dest(paths.js.dest));
});

gulp.task('scripts2', function () {
	return gulp
		.src(paths.js2.src)
		.pipe(plumber())
		.pipe(babel({
			presets: [
				['@babel/preset-env', {
					modules: false
				}]
			]
		}))
		.pipe(gulp.dest(paths.js2.dest));
});

gulp.task('webp', function () {
	return gulp
		.src('./build/img/*.{jpg,jpeg,png}')
		.pipe(
			webp({
				formats: [{
					format: 'webp'
				}],
			})
		)
		.pipe(gulp.dest(paths.images.dest));
});

gulp.task('images', function () {
	return gulp
		.src(paths.images.src)
		.pipe(plumber())
		.pipe(rename({
			dirname: ''
		}))
		.pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', function () {
	return gulp
		.src(paths.fonts.src)
		.pipe(plumber())
		.pipe(gulp.dest(paths.fonts.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('favicon', function () {
	return gulp
		.src(paths.favicon.src)
		.pipe(plumber())
		.pipe(gulp.dest(paths.favicon.dest))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
});

gulp.task('docs', function () {
	return gulp
		.src(paths.docs.src)
		.pipe(plumber())
		.pipe(gulp.dest(paths.docs.dest))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
});

gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: paths.dirs.build,
		},
	});
	gulp.watch(paths.html.watch, gulp.parallel('templates'));
	gulp.watch(paths.css.watch, gulp.series('styles'));
	gulp.watch(paths.js.watch, gulp.parallel('scripts'));
	gulp.watch(paths.js.watch, gulp.parallel('scripts2'));
	gulp.watch(paths.fonts.watch, gulp.parallel('fonts'));
	gulp.watch(paths.favicon.watch, gulp.parallel('favicon'));
	gulp.watch(paths.docs.watch, gulp.parallel('docs'));
	gulp.watch(paths.images.watch, gulp.series('images', 'webp'));
});

gulp.task(
	'build',
	gulp.series(
		'clean',
		'templates',
		'styles',
		'clean style',
		'scripts',
		'scripts2',
		'images',
		'webp',
		'fonts',
		'favicon',
		'docs'
	)
);

gulp.task(
	'build dev',
	gulp.series(
		'clean',
		'templates',
		'styles',
		'clean style',
		'scripts',
		'scripts2',
		'images',
		'webp',
		'fonts',
		'favicon',
		'docs'
	)
);

gulp.task('dev', gulp.series('build dev', 'server'));


gulp.task('html:minify', function (cb) {
	pump(
		[
			gulp.src(paths.html.dest + '/*.html'),
			htmlmin({
				collapseWhitespace: true
			}),
			gulp.dest(paths.html.dest),
		],
		cb
	);
});

gulp.task('css:minify', function () {
	return gulp
		.src(paths.css.dest + '/*.css')
		.pipe(cleanCss())
		.pipe(gulp.dest(paths.css.dest));
});

gulp.task('js:minify', function (cb) {
	pump(
		[gulp.src(paths.js.dest + '/*.js'), uglify(), gulp.dest(paths.js.dest)],
		cb
	);
});

gulp.task(
	'prod',
	gulp.series('build', 'css:minify', 'js:minify', 'html:minify')
);