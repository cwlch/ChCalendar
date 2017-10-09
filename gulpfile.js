/**
 * Created by 201603310162 on 2016/5/11.
 */
var gulp = require('gulp'),
	webpack = require("webpack"),
	gutil = require('gulp-util'),
	path = require("path"),
	minifyjs = require( 'gulp-uglify' ),	//css压缩
	concat = require( 'gulp-concat' ),		//js压缩
	packageJson = require("./package.json"),
	clean = require("gulp-clean"),
	rename = require( 'gulp-rename' );		//重命名

gulp.task("module",function () {
	gulp.src('./dist/*/*').pipe(clean());
	gulp.src( "./src/module/*.js" )
		// .pipe(minifyjs())
		.pipe(gulp.dest("./dist/module"));
});
// 运行任务
gulp.task('default',["module"], function(cb) {

	var entry = packageJson.name + '-all',
		con = {
			entry : {},
			output: {
				path: __dirname +"/dist",
				filename: "[name].js",
				library: "ChCalendar",
				libraryTarget: 'umd',
				umdNamedDefine: true
			},
			// plugins : [new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})]
		};

	con.entry[entry] = "./src/all.js";

	var entry_base = packageJson.name ,
		con_base = {
			entry : {},
			output: {
				path: __dirname +"/dist",
				filename: "[name].js",
				library: "ChCalendar",
				libraryTarget: 'umd',
				umdNamedDefine: true
			},
			// plugins : [new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})]
		};
	con_base.entry[entry_base] = "./src/ChCalendar.js";


	webpack([con,con_base], function(err, stats) {
		console.log(stats.errors, stats.warnings);
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log("[webpack]", stats.toString({
			colors: true
		}));
		cb();
	});


	/*
	gulp.src('./dist/').pipe(clean());
	gulp.src( ["./src/javascript/ChCalendar.js","./src/javascript/util.js","./src/javascript/Double.js"] )
		.pipe(concat(`ChCalendar.${packageJson.version}.js`))
		.pipe(gulp.dest("./dist/"))
		.pipe(concat(`ChCalendar.${packageJson.version}.min.js`))
		.pipe(minifyjs())
		.pipe(gulp.dest("./dist/"));*/
});