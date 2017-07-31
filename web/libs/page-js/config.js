
//配置requirejs
;require.config({
	urlArgs:new Date(),//时间戳解决浏览器缓存问题
	//baseUrl:'',
	paths:{ 
		jquery:'../jquery/jquery-3.1.1',
		common:'../common/common',
		com:'common',
		distpicker:'../jQueryDistpicker/src/distpicker',
		data:'../jQueryDistpicker/src/distpicker.data',
	}, 
	shim:{ //
		common:['jquery'],
		distpicker:['jquery'],
		
	}
});
