var php           = require('gulp-connect-php')             // run a local php server
var argv          = require('yargs').argv                   // parse command line arguments
var gulp          = require('gulp')                         // the main guy
var jscs          = require('gulp-jscs')                    // javascript code style
var clone         = require('gulp-clone')                   // used to fork a stream
var order         = require('gulp-order')                   // reorder files in stream
var uglify        = require('gulp-uglify')                  // minify js
var rename        = require('gulp-rename')                  // rename file
var insert        = require('gulp-insert')                  // add text to file
var concat        = require('gulp-concat')                  // merge files together
var stylus        = require('gulp-stylus')                  // turn stylus into css
var addsrc        = require('gulp-add-src')                 // mid-stream gulp.src()
var notify        = require('gulp-notify')                  // OS-level notifications
var stylish       = require('gulp-jscs-stylish')            // make jscs output nicer
var filelog       = require('gulp-filelog')                 // list all files in the stream
var plumber       = require('gulp-plumber')                 // handle errors without crashing
var annotate      = require('gulp-ng-annotate')             // safely minify angular
var beautify      = require('gulp-cssbeautify')             // make files human readable
var minifycss     = require('gulp-minify-css')              // minify css code
var sourcemap     = require('gulp-sourcemaps')              // create sourcemaps
var browserSync   = require('browser-sync')                 // turn on a local server
var autoprefix    = require('gulp-autoprefixer')            // prefix any css with low support
var templateCache = require('gulp-angular-templatecache')   // cache angular template files



var paths = {
	stylus: {
		files: ['angular/style/*.styl', 'angular/style/**/*.styl'],
		main: 'angular/style/main.styl'
	},
	views: ['angular/**/*.html'],
	angular: ['angular/*.js', 'angular/**/*.js'],
	output: 'public/dist/'
}

var plumberOpts = {
	errorHandler: notify.onError("Error: <%= error.message %>")
}

gulp.task('css', function() {

	// prepare css code
	var stream = gulp.src(paths.stylus.main)          // grab our stylus file
		.pipe(plumber(plumberOpts))                   // notify us if any errors appear
		.pipe(sourcemap.init())                       // get ready to write a sourcemap
		.pipe(stylus())                               // turn the stylus into css
		.pipe(sourcemap.write())                      // write the sourcemap
		.pipe(autoprefix('last 4 versions'))          // autoprefix the css code
	
	// make style.css
	stream.pipe(clone())                              // make a copy of the stream up to autoprefix
		.pipe(beautify())                             // make css really readable
		.pipe(rename('style.css'))                    // rename file
		.pipe(gulp.dest(paths.output))                // save it into the dist folder
		.pipe(browserSync.stream())                   // inject the saved file into the browsersync server
	
	// make style.min.css
	stream.pipe(clone())                              // make a copy of the stream up to autoprefix
		.pipe(minifycss())                            // minify it (removes the sourcemap)
		.pipe(sourcemap.write())                      // write the sourcemap
		.pipe(rename('style.min.css'))                // rename file
		.pipe(gulp.dest(paths.output))                // save it into the dist folder
		.pipe(browserSync.stream())                   // inject the saved file into the browsersync server
	
	return stream

})



gulp.task('angular', function() {
	
	var tplCacheOpts = {
		module: 'app.views'
	}

	var stream = gulp.src(paths.views)                      // grab all the html views
		.pipe(plumber())                                    // stop any errors from breaking a watch
		.pipe(templateCache('templates.js', tplCacheOpts))  // make a template cache from them
		.pipe(insert.prepend('//jscs:disable\n'))           // disable jscs for the template cache
		.pipe(addsrc(paths.angular))                        // add the rest of the angular app
		.pipe(order(['app.js']))                            // make sure app.js is first
		//.pipe(filelog())                                  // log the files in the stream
		.pipe(jscs())                                       // check js code style
		.on('error', function(){})                          // suppress jscs error reporting
		.pipe(stylish())                                    // third-party jscs error reporting
		.pipe(annotate())                                   // make angular callbacks minifiable
		.pipe(uglify())                                     // minify the code
		.pipe(concat('app.min.js'))                         // merge them all into the same file
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
		.pipe(browserSync.stream())                         // inject the saved file into the browsersync server
		
	return stream
	
})



gulp.task('libs', function() {
	
	// if you add more js bower components, add them to this list
	// and they'll be included in libs.min.js
	var libs = [
		'public/components/jquery/dist/jquery.min.js',
		'public/components/angular/angular.min.js',
		'public/components/angular-resource/angular-resource.min.js',
		'public/components/angular-ui-router/release/angular-ui-router.min.js',
		'public/components/angular-sanitize/angular-sanitize.min.js',
		'public/components/lodash/lodash.js',
		'public/components/satellizer/dist/satellizer.js',
		'public/components/moment/moment.js',
	]

	var stream = gulp.src(libs)                             // get all the lib files
		.pipe(concat('libs.min.js'))                        // merge them together
		.pipe(uglify())                                     // minify the js
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
	
	return stream
	
})



gulp.task('watch', ['angular', 'css'], function() {
	
	gulp.watch(paths.stylus.files, ['css'])
	gulp.watch(paths.angular,      ['angular'])
	gulp.watch(paths.views,        ['angular'])

	if(argv.browserSync) {
		php.server({
			base: 'public',
			port: 8010,
			keepalive: true,
			stdio: 'ignore'
		})

		browserSync({
			proxy: '127.0.0.1:8010',
			port: 8000,
			open: true,
			notify: false
		})
	}
	
})


gulp.task('build', ['css', 'angular', 'libs'])


gulp.task('default', ['build'], function(){
	console.log('Ready to go!')
})