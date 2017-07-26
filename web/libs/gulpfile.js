'use strict';

//nodejs引用模块的方式
//commonjs规范（同步）
var gulp = require('gulp');

//创建任务
//编译sass
var sass = require('gulp-sass');
gulp.task('compileSass',()=>{
	//文档流
	gulp.src('./sass/*.scss')
		//编译
		.pipe(sass({
			outputStyle:'expanded'
		}))
		.pipe(gulp.dest('./css/'))
})
//监听
gulp.task('jtSass',()=>{
	console.log(666)
	gulp.watch('./sass/*.scss',['compileSass'])
})