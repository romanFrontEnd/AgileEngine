const gulp = require( 'gulp' ),
    concat = require( 'gulp-concat' ),
    pump = require( 'pump' ),
    babel = require( 'gulp-babel' ),
    sourcemaps = require('gulp-sourcemaps');

gulp.task( 'build', function (cb) {
    pump( [
            sourcemaps.init(),
            babel( {
                presets: ['@babel/env']
            } ),
            gulp.src( ['./assets/js/**/*.js','./public/js/*.js'] ),
            concat( 'index.js' ),
            gulp.dest( './public/js' )
        ],
        cb
    );
} );