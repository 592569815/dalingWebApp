
var gulp = require("gulp");
var sass = require("gulp-sass");

//建立任务：
gulp.task("daling",function(){
	//匹配、查找文件；
	gulp.src("./web/libs/page-scss/*.scss")
	//编译
		.pipe(sass({
			//输入的效果；
			outputStyle:"expanded"//compact,expanded,compressed
		}).on("error",sass.logError))
		.pipe(gulp.dest("./web/libs/page-css/"))
});

//监听任务；
gulp.task("listenersass",()=>{

	//监听一类文件，可以用*代替；一个文件夹可以用**代替；
	gulp.watch("./web/libs/**/*.scss",["daling"]);
});

//浏览器同步
var browserSync = require("browser-sync");

gulp.task("mydaling",function(){
	browserSync({
		// server:"./src/",
		// 代理服务器
		proxy:'http://localhost:1703',
		//修改默认端口
		// port:10011,
		files:["./web/libs/**/*.html","./web/libs/page-css/*.css","./web*.html"]
	});
	//监听一类文件，可以用*代替；一个文件夹可以用**代替；
	gulp.watch("./web/libs/page-scss/*.scss",["daling"]);
})

