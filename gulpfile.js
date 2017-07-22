//nodejs引用模块的方式
//commonjs规范(*同步*)

/*
	方法：
		* task() 创建任务
		* src()	查找文件
		* dest() 输出
		* watch()监听
	gulp-sass：编译sass
		* outputStyle:nested默认、expanded展开、compact单行、compressed压缩
*/
//引用gulp gulp-sass 插件
var gulp = require('gulp');
var sass = require('gulp-sass');

//创建任务 目的是为了编译sass
gulp.task('bySass',function(){
	//console.log('hello world');
	//匹配(查找)sass文件
	gulp.src('./web/libs/sass/*.scss')
		//处理,编译
		.pipe(sass({
			//outputStyle: nested默认、expanded展开、compact单行、compressed压缩
			outputStyle:'expanded',
		}).on('error',sass.logError))
		//输出
		.pipe(gulp.dest('./web/libs/page-css/'))
});

//创建任务 目的监听sass并自动编译
gulp.task('jtSass',function(){
	gulp.watch('./web/libs/sass/*.scss',['bySass'])
})

